// server.js - Backend server for Noah's Bark
// This handles audio file uploads and transcription using AssemblyAI

const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for frontend
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configure file upload
const upload = multer({ 
    dest: 'uploads/',
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// AssemblyAI API Key - YOU NEED TO ADD YOUR KEY HERE
const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY || 'YOUR_API_KEY_HERE';

// Upload endpoint
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No audio file provided' });
        }

        console.log('File received:', req.file.originalname);

        // Step 1: Upload file to AssemblyAI
        const uploadUrl = await uploadToAssemblyAI(req.file.path);
        console.log('File uploaded to AssemblyAI:', uploadUrl);

        // Step 2: Request transcription
        const transcriptId = await requestTranscription(uploadUrl);
        console.log('Transcription requested:', transcriptId);

        // Step 3: Poll for completion
        const transcript = await pollTranscription(transcriptId);
        
        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        // Return transcription
        res.json({ 
            text: transcript.text,
            status: 'completed'
        });

    } catch (error) {
        console.error('Transcription error:', error);
        
        // Clean up file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({ 
            error: 'Transcription failed', 
            details: error.message 
        });
    }
});

// Upload file to AssemblyAI
async function uploadToAssemblyAI(filePath) {
    const data = fs.readFileSync(filePath);
    
    const response = await axios.post('https://api.assemblyai.com/v2/upload', data, {
        headers: {
            'authorization': ASSEMBLYAI_API_KEY,
            'content-type': 'application/octet-stream'
        }
    });

    return response.data.upload_url;
}

// Request transcription
async function requestTranscription(audioUrl) {
    const response = await axios.post('https://api.assemblyai.com/v2/transcript', {
        audio_url: audioUrl,
        language_code: 'en'
    }, {
        headers: {
            'authorization': ASSEMBLYAI_API_KEY,
            'content-type': 'application/json'
        }
    });

    return response.data.id;
}

// Poll for transcription completion
async function pollTranscription(transcriptId) {
    const maxAttempts = 60; // 5 minutes max
    let attempts = 0;

    while (attempts < maxAttempts) {
        const response = await axios.get(
            `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
            {
                headers: {
                    'authorization': ASSEMBLYAI_API_KEY
                }
            }
        );

        const { status, text, error } = response.data;

        if (status === 'completed') {
            return { text };
        } else if (status === 'error') {
            throw new Error(error || 'Transcription failed');
        }

        // Wait 5 seconds before next poll
        await new Promise(resolve => setTimeout(resolve, 5000));
        attempts++;
    }

    throw new Error('Transcription timeout');
}

app.listen(port, () => {
    console.log(`Noah's Bark server running at http://localhost:${port}`);
    console.log('Make sure to set your ASSEMBLYAI_API_KEY environment variable!');
});
