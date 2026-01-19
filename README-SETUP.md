# 🐕 Noah's Bark - Audio File Transcription

A professional web application that converts audio files to text using AssemblyAI. Perfect for students who prefer speaking to writing!

## Features

- **Upload Audio Files**: MP3, WAV, M4A, OGG, FLAC, WebM, MP4, and more
- **Accurate Transcription**: Powered by AssemblyAI's industry-leading AI
- **Download Options**: Export as .txt or .docx (Word) files
- **Professional Word Documents**: Formatted with titles, dates, and clean typography
- **Drag & Drop**: Easy file upload interface
- **Free Tier**: 5 hours of transcription per month with AssemblyAI free plan

## Setup Instructions

### 1. Get an AssemblyAI API Key (Free!)

1. Go to [AssemblyAI.com](https://www.assemblyai.com/)
2. Click "Get API Key" or "Sign Up"
3. Verify your email
4. Copy your API key from the dashboard

### 2. Install Node.js

Download and install Node.js from [nodejs.org](https://nodejs.org/) (version 16 or higher)

### 3. Install Dependencies

Open terminal/command prompt in the project folder and run:

```bash
npm install
```

### 4. Set Your API Key

**Option A: Environment Variable (Recommended)**
```bash
# On Mac/Linux
export ASSEMBLYAI_API_KEY='your-api-key-here'

# On Windows (Command Prompt)
set ASSEMBLYAI_API_KEY=your-api-key-here

# On Windows (PowerShell)
$env:ASSEMBLYAI_API_KEY='your-api-key-here'
```

**Option B: Edit server.js**
Open `server.js` and replace `YOUR_API_KEY_HERE` with your actual API key on line 21:
```javascript
const ASSEMBLYAI_API_KEY = 'your-actual-api-key-here';
```

### 5. Start the Server

```bash
npm start
```

You should see:
```
Noah's Bark server running at http://localhost:3000
```

### 6. Use the Application

1. Open your browser and go to: `http://localhost:3000`
2. Upload an audio file
3. Wait for transcription (usually 15-30 seconds per minute of audio)
4. Download as TXT or Word document!

## How It Works

1. **Upload**: You upload an audio file through the web interface
2. **Server**: The Node.js server receives the file
3. **AssemblyAI**: The server sends it to AssemblyAI for transcription
4. **Result**: The transcript is sent back and displayed
5. **Export**: You can copy, download as TXT, or create a Word document

## File Structure

```
noahs-bark/
├── server.js              # Backend server (handles API calls)
├── package.json           # Dependencies
├── public/
│   └── index.html        # Frontend interface
├── uploads/              # Temporary file storage (created automatically)
└── README.md             # This file
```

## Deployment Options

### Option 1: Local Use (Current Setup)
- Run on your computer
- Students access via `http://localhost:3000`
- Free forever!

### Option 2: Deploy to a Server

**Heroku (Free Tier Available):**
1. Install Heroku CLI
2. Create a Heroku app
3. Set your API key: `heroku config:set ASSEMBLYAI_API_KEY=your-key`
4. Deploy: `git push heroku main`

**Render, Railway, or DigitalOcean:**
- Follow their Node.js deployment guides
- Set environment variable for your API key
- Deploy your code

## Cost Information

**AssemblyAI Free Tier:**
- 5 hours of transcription per month
- No credit card required
- Perfect for classroom use

**Paid Plans (if needed):**
- Pay As You Go: $0.00025 per second (~$0.90/hour)
- Still very affordable for educational use

## Troubleshooting

**"Cannot connect to server"**
- Make sure you ran `npm start`
- Check that you're using `http://localhost:3000`

**"Transcription failed"**
- Verify your API key is set correctly
- Check you haven't exceeded free tier limit
- Ensure audio file is a supported format

**"No speech detected"**
- File may be corrupted
- Audio may be too quiet
- Try a different file

## Browser Compatibility

Works in all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Privacy & Data

- Audio files are temporarily stored during processing, then deleted
- AssemblyAI processes the audio according to their privacy policy
- No audio files are permanently stored on your server

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review AssemblyAI's [documentation](https://www.assemblyai.com/docs)
3. Open an issue on GitHub

## License

MIT License - Free to use and modify!

---

Made with ❤️ for students who prefer speaking to writing
