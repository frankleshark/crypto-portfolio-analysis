// API endpoint to trigger data update
import { spawn } from 'child_process';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Run the data update pipeline
    const scriptPath = path.join(process.cwd(), 'scripts', 'update_data.py');
    
    const pythonProcess = spawn('python3', [scriptPath], {
      stdio: 'pipe',
      cwd: process.cwd()
    });

    let output = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        res.status(200).json({ 
          success: true, 
          message: 'Data updated successfully',
          output: output
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: 'Data update failed',
          error: errorOutput,
          output: output
        });
      }
    });

    // Set timeout for long-running process
    setTimeout(() => {
      pythonProcess.kill();
      res.status(408).json({ 
        success: false, 
        message: 'Data update timed out' 
      });
    }, 300000); // 5 minutes timeout

  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
}