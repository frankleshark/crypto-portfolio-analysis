#!/usr/bin/env python3
"""
Data Update Pipeline
Orchestrates the complete data update process: fetch -> analyze -> optimize -> generate charts
"""

import subprocess
import sys
import os
from datetime import datetime

def run_script(script_path, description):
    """Run a Python script and handle errors"""
    try:
        print(f"\n{'='*60}")
        print(f"🔄 {description}")
        print(f"{'='*60}")
        
        result = subprocess.run([sys.executable, script_path], 
                              capture_output=True, text=True, check=True)
        
        print(result.stdout)
        if result.stderr:
            print("Warnings:", result.stderr)
            
        print(f"✅ {description} completed successfully")
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed:")
        print(f"Error: {e}")
        print(f"Output: {e.stdout}")
        print(f"Error output: {e.stderr}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error in {description}: {e}")
        return False

def main():
    """Run the complete data update pipeline"""
    print("🚀 Starting Cryptocurrency Portfolio Data Update Pipeline")
    print(f"⏰ Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Ensure directories exist
    os.makedirs('data', exist_ok=True)
    os.makedirs('reports', exist_ok=True)
    
    # Define the pipeline steps
    pipeline_steps = [
        ("scripts/fetch_data.py", "Fetching latest cryptocurrency data"),
        ("scripts/portfolio_analysis.py", "Running portfolio analysis"),
        ("scripts/portfolio_optimization.py", "Running portfolio optimization"),
        ("scripts/generate_charts.py", "Generating dashboard charts"),
    ]
    
    # Track success/failure
    results = []
    
    # Execute pipeline
    for script_path, description in pipeline_steps:
        if os.path.exists(script_path):
            success = run_script(script_path, description)
            results.append((description, success))
        else:
            print(f"❌ Script not found: {script_path}")
            results.append((description, False))
    
    # Summary
    print(f"\n{'='*60}")
    print("📊 PIPELINE SUMMARY")
    print(f"{'='*60}")
    
    successful = sum(1 for _, success in results if success)
    total = len(results)
    
    for description, success in results:
        status = "✅ SUCCESS" if success else "❌ FAILED"
        print(f"{status}: {description}")
    
    print(f"\n🎯 Pipeline completed: {successful}/{total} steps successful")
    print(f"⏰ Finished at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    if successful == total:
        print("🎉 All data updated successfully! Dashboard is ready.")
        return 0
    else:
        print("⚠️  Some steps failed. Check the logs above.")
        return 1

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)