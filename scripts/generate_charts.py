#!/usr/bin/env python3
"""
Enhanced Chart Generation with Custom Color Palette
Generates specific charts for the dashboard with professional styling
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import quantstats as qs
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

# Custom Color Palette from the provided image
COLORS = {
    'yellow': '#FEF08A',      # Light yellow
    'orange': '#FB923C',      # Orange
    'red': '#F87171',         # Light red
    'purple': '#A78BFA',      # Light purple
    'blue': '#60A5FA',        # Light blue
    'green': '#4ADE80',       # Light green
    'teal': '#2DD4BF',        # Teal
    'dark_purple': '#7C3AED', # Dark purple
    'dark_blue': '#2563EB',   # Dark blue
    'dark_green': '#059669',  # Dark green
}

# Set professional style
plt.style.use('dark_background')
sns.set_palette([COLORS['blue'], COLORS['green'], COLORS['purple'], 
                COLORS['orange'], COLORS['red'], COLORS['teal'], 
                COLORS['yellow'], COLORS['dark_purple']])

def load_data():
    """Load cryptocurrency price and returns data"""
    try:
        price_data = pd.read_csv('data/crypto_prices.csv', 
                                index_col=0, parse_dates=True)
        returns_data = price_data.pct_change().dropna()
        return price_data, returns_data
    except FileNotFoundError:
        print("Error: data/crypto_prices.csv not found.")
        return None, None

def create_cumulative_returns_chart(price_data, returns_data):
    """Generate cumulative returns chart"""
    fig, ax = plt.subplots(figsize=(14, 8))
    fig.patch.set_facecolor('#0F172A')
    ax.set_facecolor('#1E293B')
    
    # Calculate portfolio returns (equal weight)
    portfolio_returns = returns_data.mean(axis=1)
    portfolio_cumulative = (1 + portfolio_returns).cumprod()
    
    # Plot portfolio
    ax.plot(portfolio_cumulative.index, portfolio_cumulative.values, 
            linewidth=3, label='Equal Weight Portfolio', color=COLORS['green'])
    
    # Plot top performers
    top_assets = ['HYPE', 'BNB', 'ETH', 'TRON']
    colors = [COLORS['yellow'], COLORS['blue'], COLORS['purple'], COLORS['orange']]
    
    for i, asset in enumerate(top_assets):
        if asset in returns_data.columns:
            cumulative = (1 + returns_data[asset]).cumprod()
            ax.plot(cumulative.index, cumulative.values, 
                   alpha=0.8, label=asset, color=colors[i], linewidth=2)
    
    ax.set_title('Cumulative Returns: Portfolio vs Top Assets', 
                fontsize=16, fontweight='bold', color='white', pad=20)
    ax.set_ylabel('Cumulative Return', fontsize=12, color='white')
    ax.legend(loc='upper left', frameon=True, facecolor='#334155', edgecolor='#475569')
    ax.grid(True, alpha=0.3, color='#475569')
    ax.tick_params(colors='white')
    
    plt.tight_layout()
    plt.savefig('/home/project/public/reports/cumulative_returns.png', 
                dpi=300, bbox_inches='tight', facecolor='#0F172A')
    plt.close()

def create_portfolio_drawdown_chart(returns_data):
    """Generate portfolio drawdown chart"""
    fig, ax = plt.subplots(figsize=(12, 6))
    fig.patch.set_facecolor('#0F172A')
    ax.set_facecolor('#1E293B')
    
    portfolio_returns = returns_data.mean(axis=1)
    drawdowns = qs.stats.to_drawdown_series(portfolio_returns)
    
    ax.fill_between(drawdowns.index, drawdowns, 0, alpha=0.7, color=COLORS['red'])
    ax.plot(drawdowns.index, drawdowns, color=COLORS['red'], linewidth=2)
    
    ax.set_title('Portfolio Drawdowns', fontsize=16, fontweight='bold', color='white', pad=20)
    ax.set_ylabel('Drawdown', fontsize=12, color='white')
    ax.grid(True, alpha=0.3, color='#475569')
    ax.tick_params(colors='white')
    
    plt.tight_layout()
    plt.savefig('/home/project/public/reports/portfolio_drawdown.png', 
                dpi=300, bbox_inches='tight', facecolor='#0F172A')
    plt.close()

def create_return_distribution_chart(returns_data):
    """Generate return distribution histogram"""
    fig, ax = plt.subplots(figsize=(10, 6))
    fig.patch.set_facecolor('#0F172A')
    ax.set_facecolor('#1E293B')
    
    portfolio_returns = returns_data.mean(axis=1)
    
    ax.hist(portfolio_returns, bins=50, alpha=0.7, color=COLORS['blue'], edgecolor='white')
    ax.axvline(portfolio_returns.mean(), color=COLORS['green'], linestyle='--', 
               linewidth=2, label=f'Mean: {portfolio_returns.mean():.2%}')
    ax.axvline(portfolio_returns.median(), color=COLORS['yellow'], linestyle='--', 
               linewidth=2, label=f'Median: {portfolio_returns.median():.2%}')
    
    ax.set_title('Portfolio Returns Distribution', fontsize=16, fontweight='bold', color='white', pad=20)
    ax.set_xlabel('Daily Return', fontsize=12, color='white')
    ax.set_ylabel('Frequency', fontsize=12, color='white')
    ax.legend(frameon=True, facecolor='#334155', edgecolor='#475569')
    ax.grid(True, alpha=0.3, color='#475569')
    ax.tick_params(colors='white')
    
    plt.tight_layout()
    plt.savefig('/home/project/public/reports/return_distribution.png', 
                dpi=300, bbox_inches='tight', facecolor='#0F172A')
    plt.close()

def create_correlation_matrix_chart(returns_data):
    """Generate correlation matrix heatmap"""
    fig, ax = plt.subplots(figsize=(10, 8))
    fig.patch.set_facecolor('#0F172A')
    
    correlation_matrix = returns_data.corr()
    
    sns.heatmap(correlation_matrix, annot=True, cmap='RdYlBu_r', center=0, 
                square=True, ax=ax, fmt='.2f', cbar_kws={'shrink': 0.8},
                annot_kws={'color': 'white'})
    
    ax.set_title('Cryptocurrency Correlation Matrix', fontsize=16, fontweight='bold', 
                color='white', pad=20)
    ax.tick_params(colors='white')
    
    plt.tight_layout()
    plt.savefig('/home/project/public/reports/correlation_matrix.png', 
                dpi=300, bbox_inches='tight', facecolor='#0F172A')
    plt.close()

def create_strategy_weights_chart():
    """Generate strategy weights comparison"""
    try:
        weights_df = pd.read_csv('data/portfolio_weights_comparison.csv', 
                                index_col=0)
        
        fig, ax = plt.subplots(figsize=(12, 8))
        fig.patch.set_facecolor('#0F172A')
        ax.set_facecolor('#1E293B')
        
        weights_df.T.plot(kind='bar', stacked=True, ax=ax, width=0.8, 
                         color=[COLORS['blue'], COLORS['green'], COLORS['purple'], 
                               COLORS['orange'], COLORS['red'], COLORS['teal'], 
                               COLORS['yellow'], COLORS['dark_purple']])
        
        ax.set_title('Portfolio Allocation by Strategy', fontsize=16, fontweight='bold', 
                    color='white', pad=20)
        ax.set_ylabel('Weight', fontsize=12, color='white')
        ax.set_xlabel('Strategy', fontsize=12, color='white')
        ax.legend(bbox_to_anchor=(1.05, 1), loc='upper left', frameon=True, 
                 facecolor='#334155', edgecolor='#475569')
        ax.tick_params(colors='white', rotation=45)
        ax.grid(True, alpha=0.3, color='#475569', axis='y')
        
        plt.tight_layout()
        plt.savefig('/home/project/public/reports/strategy_weights.png', 
                    dpi=300, bbox_inches='tight', facecolor='#0F172A')
        plt.close()
        
    except FileNotFoundError:
        print("Strategy weights file not found, skipping...")

def main():
    """Generate all dashboard charts"""
    print("Generating dashboard charts with custom color palette...")
    
    price_data, returns_data = load_data()
    if price_data is None or returns_data is None:
        return
    
    # Generate all charts
    create_cumulative_returns_chart(price_data, returns_data)
    print("✅ Cumulative returns chart generated")
    
    create_portfolio_drawdown_chart(returns_data)
    print("✅ Portfolio drawdown chart generated")
    
    create_return_distribution_chart(returns_data)
    print("✅ Return distribution chart generated")
    
    create_correlation_matrix_chart(returns_data)
    print("✅ Correlation matrix chart generated")
    
    create_strategy_weights_chart()
    print("✅ Strategy weights chart generated")
    
    print("\n🎨 All charts generated with custom color palette!")
    print("Charts saved to: reports/")

if __name__ == "__main__":
    main()