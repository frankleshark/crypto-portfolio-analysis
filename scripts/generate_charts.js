const fs = require('fs');
const path = require('path');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { Chart, registerables } = require('chart.js');

Chart.register(...registerables);

// Chart configuration
const width = 800;
const height = 600;
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

// Ensure output directory exists
function ensureOutputDirectory() {
    const outputDir = path.join(__dirname, '..', 'public', 'reports');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    return outputDir;
}

// Read and parse CSV data
function readCSVData(filePath) {
    try {
        const csvContent = fs.readFileSync(filePath, 'utf8');
        const lines = csvContent.trim().split('\n');
        const headers = lines[0].split(',');
        
        const data = lines.slice(1).map(line => {
            const values = line.split(',');
            const row = {};
            headers.forEach((header, index) => {
                row[header.trim()] = values[index] ? values[index].trim() : '';
            });
            return row;
        });
        
        return { headers, data };
    } catch (error) {
        console.error(`Error reading CSV file ${filePath}:`, error.message);
        return { headers: [], data: [] };
    }
}

// Generate cumulative returns chart
async function generateCumulativeReturnsChart(outputDir) {
    try {
        const { data } = readCSVData(path.join(__dirname, '..', 'data', 'portfolio_metrics.csv'));
        
        if (data.length === 0) {
            console.log('No data available for cumulative returns chart');
            return;
        }

        const labels = data.map(row => row.date || row.Date);
        const portfolioReturns = data.map(row => parseFloat(row.cumulative_return || row.portfolio_return || 0));

        const configuration = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Portfolio Cumulative Returns',
                    data: portfolioReturns,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Portfolio Cumulative Returns'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Cumulative Return (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    }
                }
            }
        };

        const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
        fs.writeFileSync(path.join(outputDir, 'cumulative_returns.png'), imageBuffer);
        console.log('Generated cumulative_returns.png');
    } catch (error) {
        console.error('Error generating cumulative returns chart:', error.message);
    }
}

// Generate portfolio drawdown chart
async function generateDrawdownChart(outputDir) {
    try {
        const { data } = readCSVData(path.join(__dirname, '..', 'data', 'portfolio_metrics.csv'));
        
        if (data.length === 0) {
            console.log('No data available for drawdown chart');
            return;
        }

        const labels = data.map(row => row.date || row.Date);
        const drawdown = data.map(row => parseFloat(row.drawdown || 0));

        const configuration = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Portfolio Drawdown',
                    data: drawdown,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Portfolio Drawdown'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Drawdown (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    }
                }
            }
        };

        const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
        fs.writeFileSync(path.join(outputDir, 'portfolio_drawdown.png'), imageBuffer);
        console.log('Generated portfolio_drawdown.png');
    } catch (error) {
        console.error('Error generating drawdown chart:', error.message);
    }
}

// Generate return distribution chart
async function generateReturnDistributionChart(outputDir) {
    try {
        const { data } = readCSVData(path.join(__dirname, '..', 'data', 'portfolio_metrics.csv'));
        
        if (data.length === 0) {
            console.log('No data available for return distribution chart');
            return;
        }

        const returns = data.map(row => parseFloat(row.daily_return || 0)).filter(r => !isNaN(r));
        
        // Create histogram bins
        const bins = 20;
        const min = Math.min(...returns);
        const max = Math.max(...returns);
        const binWidth = (max - min) / bins;
        
        const histogram = new Array(bins).fill(0);
        const labels = [];
        
        for (let i = 0; i < bins; i++) {
            const binStart = min + i * binWidth;
            const binEnd = min + (i + 1) * binWidth;
            labels.push(`${binStart.toFixed(2)}%`);
            
            returns.forEach(ret => {
                if (ret >= binStart && ret < binEnd) {
                    histogram[i]++;
                }
            });
        }

        const configuration = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Frequency',
                    data: histogram,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Daily Returns Distribution'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Frequency'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Daily Return (%)'
                        }
                    }
                }
            }
        };

        const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
        fs.writeFileSync(path.join(outputDir, 'return_distribution.png'), imageBuffer);
        console.log('Generated return_distribution.png');
    } catch (error) {
        console.error('Error generating return distribution chart:', error.message);
    }
}

// Generate correlation matrix chart
async function generateCorrelationMatrixChart(outputDir) {
    try {
        const { data } = readCSVData(path.join(__dirname, '..', 'data', 'individual_performance.csv'));
        
        if (data.length === 0) {
            console.log('No data available for correlation matrix chart');
            return;
        }

        // Simple correlation matrix visualization
        const assets = ['BTC', 'ETH', 'ADA', 'DOT', 'LINK'];
        const correlationData = [];
        
        // Generate sample correlation data (in real implementation, calculate from price data)
        for (let i = 0; i < assets.length; i++) {
            for (let j = 0; j < assets.length; j++) {
                correlationData.push({
                    x: assets[j],
                    y: assets[i],
                    v: i === j ? 1 : Math.random() * 0.8 + 0.1 // Sample correlation values
                });
            }
        }

        const configuration = {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Correlation',
                    data: correlationData.map(d => ({ x: d.x, y: d.y, r: Math.abs(d.v) * 20 })),
                    backgroundColor: correlationData.map(d => 
                        d.v > 0.5 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(54, 162, 235, 0.6)'
                    )
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Asset Correlation Matrix'
                    }
                },
                scales: {
                    x: {
                        type: 'category',
                        labels: assets,
                        title: {
                            display: true,
                            text: 'Assets'
                        }
                    },
                    y: {
                        type: 'category',
                        labels: assets,
                        title: {
                            display: true,
                            text: 'Assets'
                        }
                    }
                }
            }
        };

        const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
        fs.writeFileSync(path.join(outputDir, 'correlation_matrix.png'), imageBuffer);
        console.log('Generated correlation_matrix.png');
    } catch (error) {
        console.error('Error generating correlation matrix chart:', error.message);
    }
}

// Generate strategy weights chart
async function generateStrategyWeightsChart(outputDir) {
    try {
        const { data } = readCSVData(path.join(__dirname, '..', 'data', 'portfolio_weights_comparison.csv'));
        
        if (data.length === 0) {
            console.log('No data available for strategy weights chart');
            return;
        }

        const assets = ['BTC', 'ETH', 'ADA', 'DOT', 'LINK'];
        const strategies = ['Equal Weight', 'Market Cap', 'Risk Parity', 'Optimized'];
        
        const datasets = strategies.map((strategy, index) => ({
            label: strategy,
            data: assets.map(() => Math.random() * 0.4 + 0.1), // Sample weights
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 205, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)'
            ][index]
        }));

        const configuration = {
            type: 'bar',
            data: {
                labels: assets,
                datasets: datasets
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Portfolio Strategy Weights Comparison'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1,
                        title: {
                            display: true,
                            text: 'Weight'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Assets'
                        }
                    }
                }
            }
        };

        const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
        fs.writeFileSync(path.join(outputDir, 'strategy_weights.png'), imageBuffer);
        console.log('Generated strategy_weights.png');
    } catch (error) {
        console.error('Error generating strategy weights chart:', error.message);
    }
}

// Main function to generate all charts
async function generateAllCharts() {
    console.log('Starting chart generation...');
    
    const outputDir = ensureOutputDirectory();
    
    await generateCumulativeReturnsChart(outputDir);
    await generateDrawdownChart(outputDir);
    await generateReturnDistributionChart(outputDir);
    await generateCorrelationMatrixChart(outputDir);
    await generateStrategyWeightsChart(outputDir);
    
    console.log('Chart generation completed!');
}

// Run the chart generation
generateAllCharts().catch(console.error);