#!/usr/bin/env python3
"""
Chart Generation Using Quantstats Library
Generates individual chart images using quantstats plotting functions
"""

import pandas as pd
import numpy as np
import quantstats as qs
import matplotlib.pyplot as plt
import seaborn as sns
import os
import warnings
warnings.filterwarnings('ignore')

# Set matplotlib backend for headless environment
import matplotlib
matplotlib.use('Agg')

def ensure_output_directory():
    """Ensure the output directory exists"""
    os.makedirs('public/reports', exist_ok=True)
    print("✅ Output directory created/verified: public/reports/")

def load_data():
    """Load cryptocurrency price and returns data"""
    try:
        price_data = pd.read_csv('data/crypto_prices.csv', 
                                index_col=0, parse_dates=True)
        returns_data = price_data.pct_change().dropna()
        print(f"Loaded data for {len(price_data.columns)} cryptocurrencies")
        print(f"Date range: {price_data.index[0]} to {price_data.index[-1]}")
        return price_data, returns_data
    except FileNotFoundError:
        print("Error: data/crypto_prices.csv not found.")
        return None, None

def create_portfolio_returns(returns_data):
    """Create equal-weight portfolio returns"""
    # Equal weight: 1/n for each cryptocurrency
    weights = np.array([1/len(returns_data.columns)] * len(returns_data.columns))
    portfolio_returns = returns_data.dot(weights)
    return portfolio_returns

def generate_cumulative_returns_chart(portfolio_returns, returns_data):
    """Generate cumulative returns chart using quantstats"""
    try:
        # Create the plot
        fig, ax = plt.subplots(figsize=(12, 8))
        
        # Plot portfolio cumulative returns
        qs.plots.returns(portfolio_returns, ax=ax, savefig=False)
        
        # Customize the plot
        ax.set_title('Portfolio Cumulative Returns', fontsize=16, fontweight='bold')
        ax.set_ylabel('Cumulative Returns')
        ax.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig('public/reports/cumulative_returns.png', dpi=300, bbox_inches='tight')
        plt.close()
        print("✅ Cumulative returns chart generated")
        
    except Exception as e:
        print(f"❌ Error generating cumulative returns chart: {e}")

def generate_drawdown_chart(portfolio_returns):
    """Generate drawdown chart using quantstats"""
    try:
        # Create the plot
        fig, ax = plt.subplots(figsize=(12, 6))
        
        # Plot drawdowns
        qs.plots.drawdown(portfolio_returns, ax=ax, savefig=False)
        
        # Customize the plot
        ax.set_title('Portfolio Drawdowns', fontsize=16, fontweight='bold')
        ax.set_ylabel('Drawdown')
        ax.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig('public/reports/portfolio_drawdown.png', dpi=300, bbox_inches='tight')
        plt.close()
        print("✅ Portfolio drawdown chart generated")
        
    except Exception as e:
        print(f"❌ Error generating drawdown chart: {e}")

def generate_returns_distribution_chart(portfolio_returns):
    """Generate returns distribution chart using quantstats"""
    try:
        # Create the plot
        fig, ax = plt.subplots(figsize=(10, 6))
        
        # Plot distribution
        qs.plots.histogram(portfolio_returns, ax=ax, savefig=False)
        
        # Customize the plot
        ax.set_title('Portfolio Returns Distribution', fontsize=16, fontweight='bold')
        ax.set_xlabel('Daily Returns')
        ax.set_ylabel('Frequency')
        ax.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig('public/reports/return_distribution.png', dpi=300, bbox_inches='tight')
        plt.close()
        print("✅ Return distribution chart generated")
        
    except Exception as e:
        print(f"❌ Error generating return distribution chart: {e}")

def generate_rolling_metrics_chart(portfolio_returns):
    """Generate rolling metrics chart using quantstats"""
    try:
        # Create the plot
        fig, ax = plt.subplots(figsize=(12, 8))
        
        # Plot rolling Sharpe ratio
        qs.plots.rolling_sharpe(portfolio_returns, ax=ax, savefig=False)
        
        # Customize the plot
        ax.set_title('Rolling Sharpe Ratio (6-Month)', fontsize=16, fontweight='bold')
        ax.set_ylabel('Sharpe Ratio')
        ax.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig('public/reports/rolling_sharpe.png', dpi=300, bbox_inches='tight')
        plt.close()
        print("✅ Rolling Sharpe ratio chart generated")
        
    except Exception as e:
        print(f"❌ Error generating rolling metrics chart: {e}")

def generate_monthly_heatmap(portfolio_returns):
    """Generate monthly returns heatmap using quantstats"""
    try:
        # Create the plot
        fig, ax = plt.subplots(figsize=(12, 8))
        
        # Plot monthly heatmap
        qs.plots.monthly_heatmap(portfolio_returns, ax=ax, savefig=False)
        
        # Customize the plot
        ax.set_title('Monthly Returns Heatmap', fontsize=16, fontweight='bold')
        
        plt.tight_layout()
        plt.savefig('public/reports/monthly_heatmap.png', dpi=300, bbox_inches='tight')
        plt.close()
        print("✅ Monthly heatmap chart generated")
        
    except Exception as e:
        print(f"❌ Error generating monthly heatmap: {e}")

def generate_correlation_matrix(returns_data):
    """Generate correlation matrix heatmap"""
    try:
        # Create the plot
        fig, ax = plt.subplots(figsize=(10, 8))
        
        # Calculate correlation matrix
        correlation_matrix = returns_data.corr()
        
        # Plot heatmap
        sns.heatmap(correlation_matrix, annot=True, cmap='RdYlBu_r', center=0, 
                    square=True, ax=ax, fmt='.2f', cbar_kws={'shrink': 0.8})
        
        ax.set_title('Cryptocurrency Correlation Matrix', fontsize=16, fontweight='bold')
        
        plt.tight_layout()
        plt.savefig('public/reports/correlation_matrix.png', dpi=300, bbox_inches='tight')
        plt.close()
        print("✅ Correlation matrix chart generated")
        
    except Exception as e:
        print(f"❌ Error generating correlation matrix: {e}")

def generate_performance_comparison(returns_data):
    """Generate performance comparison chart"""
    try:
        # Create the plot
        fig, ax = plt.subplots(figsize=(12, 8))
        
        # Calculate cumulative returns for each asset
        cumulative_returns = (1 + returns_data).cumprod()
        
        # Plot each asset
        for column in cumulative_returns.columns:
            ax.plot(cumulative_returns.index, cumulative_returns[column], 
                   label=column, alpha=0.8, linewidth=2)
        
        # Add portfolio
        portfolio_returns = returns_data.mean(axis=1)
        portfolio_cumulative = (1 + portfolio_returns).cumprod()
        ax.plot(portfolio_cumulative.index, portfolio_cumulative.values, 
               label='Equal Weight Portfolio', linewidth=3, color='black')
        
        ax.set_title('Cumulative Returns: Portfolio vs Individual Assets', 
                    fontsize=16, fontweight='bold')
        ax.set_ylabel('Cumulative Returns')
        ax.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
        ax.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig('public/reports/performance_comparison.png', dpi=300, bbox_inches='tight')
        plt.close()
        print("✅ Performance comparison chart generated")
        
    except Exception as e:
        print(f"❌ Error generating performance comparison chart: {e}")

def main():
    """Generate all dashboard charts using quantstats"""
    print("Generating dashboard charts using quantstats library...")
    
    # Ensure output directory exists
    ensure_output_directory()
    
    # Load data
    price_data, returns_data = load_data()
    if price_data is None or returns_data is None:
        print("❌ Failed to load data")
        return
    
    # Create portfolio returns
    portfolio_returns = create_portfolio_returns(returns_data)
    print(f"Created portfolio with {len(returns_data.columns)} assets")
    
    # Generate all charts using quantstats
    generate_cumulative_returns_chart(portfolio_returns, returns_data)
    generate_drawdown_chart(portfolio_returns)
    generate_returns_distribution_chart(portfolio_returns)
    generate_rolling_metrics_chart(portfolio_returns)
    generate_monthly_heatmap(portfolio_returns)
    generate_correlation_matrix(returns_data)
    generate_performance_comparison(returns_data)
    
    print("\n🎨 All charts generated using quantstats library!")
    print("Charts saved to public/reports/:")
    print("  - cumulative_returns.png")
    print("  - portfolio_drawdown.png") 
    print("  - return_distribution.png")
    print("  - rolling_sharpe.png")
    print("  - monthly_heatmap.png")
    print("  - correlation_matrix.png")
    print("  - performance_comparison.png")

if __name__ == "__main__":
    main()