#!/usr/bin/env python3
"""
Crypto Portfolio Analysis - Main Analysis Script
Performs comprehensive analysis of equal-weight cryptocurrency portfolio using quantstats
"""

import pandas as pd
import numpy as np
import quantstats as qs
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

# Set style for better plots
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

def load_data():
    """
    Load cryptocurrency price data from CSV file
    
    Returns:
        pd.DataFrame: Price data with datetime index
    """
    try:
        data = pd.read_csv('/Users/mfy/crypto-portfolio-analysis/crypto_prices.csv', 
                          index_col=0, parse_dates=True)
        print(f"Loaded data for {len(data.columns)} cryptocurrencies")
        print(f"Date range: {data.index[0]} to {data.index[-1]}")
        print(f"Total observations: {len(data)}")
        return data
    except FileNotFoundError:
        print("Error: crypto_prices.csv not found. Please run fetch_data.py first.")
        return None

def calculate_returns(price_data):
    """
    Calculate daily returns for all cryptocurrencies
    
    Args:
        price_data (pd.DataFrame): Price data
    
    Returns:
        pd.DataFrame: Daily returns
    """
    returns = price_data.pct_change().dropna()
    print(f"Calculated returns for {len(returns)} trading days")
    return returns

def create_equal_weight_portfolio(returns_data):
    """
    Create equal-weight portfolio returns (no rebalancing)
    
    Args:
        returns_data (pd.DataFrame): Daily returns for each cryptocurrency
    
    Returns:
        pd.Series: Daily returns of the equal-weight portfolio
    """
    # Equal weight: 12.5% (1/8) for each cryptocurrency
    weights = np.array([0.125] * len(returns_data.columns))
    
    # Calculate portfolio returns as weighted average of individual returns
    portfolio_returns = returns_data.dot(weights)
    
    print(f"Created equal-weight portfolio with {len(returns_data.columns)} assets")
    print("Portfolio weights:")
    for i, symbol in enumerate(returns_data.columns):
        print(f"  {symbol}: {weights[i]:.1%}")
    
    return portfolio_returns

def analyze_individual_performance(returns_data, price_data):
    """
    Analyze individual cryptocurrency performance
    
    Args:
        returns_data (pd.DataFrame): Daily returns
        price_data (pd.DataFrame): Price data
    
    Returns:
        pd.DataFrame: Performance summary for each cryptocurrency
    """
    performance_summary = []
    
    for symbol in returns_data.columns:
        returns = returns_data[symbol]
        
        # Calculate key metrics
        total_return = (price_data[symbol].iloc[-1] / price_data[symbol].iloc[0]) - 1
        # Calculate cumulative return properly
        cumulative_returns = (1 + returns).cumprod()
        annualized_return = qs.stats.cagr(returns)
        volatility = returns.std() * np.sqrt(252)  # Annualized volatility
        sharpe = qs.stats.sharpe(returns)
        max_dd = qs.stats.max_drawdown(returns)
        
        performance_summary.append({
            'Symbol': symbol,
            'Total Return': total_return,
            'Annualized Return': annualized_return,
            'Annualized Volatility': volatility,
            'Sharpe Ratio': sharpe,
            'Max Drawdown': max_dd,
            'Latest Price': price_data[symbol].iloc[-1]
        })
    
    return pd.DataFrame(performance_summary)

def generate_portfolio_analysis(portfolio_returns, price_data):
    """
    Generate comprehensive portfolio analysis using quantstats
    
    Args:
        portfolio_returns (pd.Series): Portfolio returns
        price_data (pd.DataFrame): Original price data
    
    Returns:
        dict: Dictionary containing various performance metrics
    """
    print("\n" + "="*60)
    print("PORTFOLIO PERFORMANCE ANALYSIS")
    print("="*60)
    
    # Key performance metrics
    cumulative_returns = (1 + portfolio_returns).cumprod()
    total_return = cumulative_returns.iloc[-1] - 1
    annualized_return = qs.stats.cagr(portfolio_returns)
    volatility = qs.stats.volatility(portfolio_returns)
    sharpe_ratio = qs.stats.sharpe(portfolio_returns)
    sortino_ratio = qs.stats.sortino(portfolio_returns)
    max_drawdown = qs.stats.max_drawdown(portfolio_returns)
    calmar_ratio = qs.stats.calmar(portfolio_returns)
    
    # Risk metrics
    var_95 = qs.stats.var(portfolio_returns)
    cvar_95 = qs.stats.cvar(portfolio_returns)
    
    # Win/Loss metrics
    win_rate = qs.stats.win_rate(portfolio_returns)
    
    results = {
        'Total Return': total_return,
        'Annualized Return': annualized_return,
        'Volatility (Annualized)': volatility,
        'Sharpe Ratio': sharpe_ratio,
        'Sortino Ratio': sortino_ratio,
        'Maximum Drawdown': max_drawdown,
        'Calmar Ratio': calmar_ratio,
        'VaR (95%)': var_95,
        'CVaR (95%)': cvar_95,
        'Win Rate': win_rate,
        'Best Day': portfolio_returns.max(),
        'Worst Day': portfolio_returns.min(),
    }
    
    # Print results
    print(f"Total Return:           {total_return:.2%}")
    print(f"Annualized Return:      {annualized_return:.2%}")
    print(f"Volatility (Ann.):      {volatility:.2%}")
    print(f"Sharpe Ratio:           {sharpe_ratio:.2f}")
    print(f"Sortino Ratio:          {sortino_ratio:.2f}")
    print(f"Maximum Drawdown:       {max_drawdown:.2%}")
    print(f"Calmar Ratio:           {calmar_ratio:.2f}")
    print(f"VaR (95%):              {var_95:.2%}")
    print(f"CVaR (95%):             {cvar_95:.2%}")
    print(f"Win Rate:               {win_rate:.2%}")
    print(f"Best Day:               {portfolio_returns.max():.2%}")
    print(f"Worst Day:              {portfolio_returns.min():.2%}")
    
    return results

def create_visualizations(portfolio_returns, individual_returns, price_data):
    """
    Create comprehensive visualizations for the portfolio analysis
    
    Args:
        portfolio_returns (pd.Series): Portfolio returns
        individual_returns (pd.DataFrame): Individual cryptocurrency returns
        price_data (pd.DataFrame): Price data
    """
    # Create figure with subplots
    fig = plt.figure(figsize=(20, 24))
    
    # 1. Cumulative Returns Comparison
    ax1 = plt.subplot(4, 2, 1)
    
    # Calculate cumulative returns
    portfolio_cumulative = (1 + portfolio_returns).cumprod()
    individual_cumulative = {}
    for symbol in individual_returns.columns:
        individual_cumulative[symbol] = (1 + individual_returns[symbol]).cumprod()
    
    # Plot portfolio
    portfolio_cumulative.plot(ax=ax1, linewidth=3, label='Equal Weight Portfolio', color='black')
    
    # Plot individual cryptocurrencies
    for symbol in individual_returns.columns:
        individual_cumulative[symbol].plot(ax=ax1, alpha=0.7, label=symbol)
    
    ax1.set_title('Cumulative Returns: Portfolio vs Individual Assets', fontsize=14, fontweight='bold')
    ax1.set_ylabel('Cumulative Return')
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    
    # 2. Portfolio Drawdowns
    ax2 = plt.subplot(4, 2, 2)
    drawdowns = qs.stats.to_drawdown_series(portfolio_returns)
    drawdowns.plot(ax=ax2, color='red', alpha=0.7)
    ax2.fill_between(drawdowns.index, drawdowns, 0, alpha=0.3, color='red')
    ax2.set_title('Portfolio Drawdowns', fontsize=14, fontweight='bold')
    ax2.set_ylabel('Drawdown')
    ax2.grid(True, alpha=0.3)
    
    # 3. Monthly Returns Heatmap
    ax3 = plt.subplot(4, 2, 3)
    try:
        # Create monthly returns table
        monthly_returns = portfolio_returns.resample('M').apply(lambda x: (1 + x).prod() - 1)
        monthly_table = monthly_returns.groupby([monthly_returns.index.year, monthly_returns.index.month]).first().unstack()
        sns.heatmap(monthly_table, annot=True, fmt='.2%', cmap='RdYlGn', center=0, ax=ax3)
        ax3.set_title('Monthly Returns Heatmap', fontsize=14, fontweight='bold')
    except:
        ax3.text(0.5, 0.5, 'Monthly Returns Heatmap\n(Not enough data)', 
                horizontalalignment='center', verticalalignment='center', transform=ax3.transAxes)
        ax3.set_title('Monthly Returns Heatmap', fontsize=14, fontweight='bold')
    
    # 4. Rolling Volatility
    ax4 = plt.subplot(4, 2, 4)
    rolling_vol = portfolio_returns.rolling(30).std() * np.sqrt(252)
    rolling_vol.plot(ax=ax4, color='red', alpha=0.8)
    ax4.set_title('30-Day Rolling Volatility (Annualized)', fontsize=14, fontweight='bold')
    ax4.set_ylabel('Volatility')
    ax4.grid(True, alpha=0.3)
    
    # 5. Return Distribution
    ax5 = plt.subplot(4, 2, 5)
    portfolio_returns.hist(bins=50, ax=ax5, alpha=0.7, edgecolor='black')
    ax5.axvline(portfolio_returns.mean(), color='red', linestyle='--', label=f'Mean: {portfolio_returns.mean():.2%}')
    ax5.axvline(portfolio_returns.median(), color='green', linestyle='--', label=f'Median: {portfolio_returns.median():.2%}')
    ax5.set_title('Portfolio Returns Distribution', fontsize=14, fontweight='bold')
    ax5.set_xlabel('Daily Return')
    ax5.set_ylabel('Frequency')
    ax5.legend()
    ax5.grid(True, alpha=0.3)
    
    # 6. Correlation Heatmap
    ax6 = plt.subplot(4, 2, 6)
    correlation_matrix = individual_returns.corr()
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0, 
                square=True, ax=ax6, fmt='.2f', cbar_kws={'shrink': 0.8})
    ax6.set_title('Cryptocurrency Correlation Matrix', fontsize=14, fontweight='bold')
    
    # 7. Risk-Return Scatter Plot
    ax7 = plt.subplot(4, 2, 7)
    
    # Calculate metrics for scatter plot
    individual_metrics = []
    for symbol in individual_returns.columns:
        returns = individual_returns[symbol]
        ann_return = qs.stats.cagr(returns)
        ann_vol = qs.stats.volatility(returns)
        individual_metrics.append((symbol, ann_return, ann_vol))
    
    # Portfolio metrics
    portfolio_ann_return = qs.stats.cagr(portfolio_returns)
    portfolio_ann_vol = qs.stats.volatility(portfolio_returns)
    
    # Plot individual assets
    for symbol, ret, vol in individual_metrics:
        ax7.scatter(vol, ret, s=100, alpha=0.7, label=symbol)
    
    # Plot portfolio
    ax7.scatter(portfolio_ann_vol, portfolio_ann_return, s=200, color='black', 
               marker='*', label='Portfolio', edgecolor='white', linewidth=2)
    
    ax7.set_xlabel('Annualized Volatility')
    ax7.set_ylabel('Annualized Return')
    ax7.set_title('Risk-Return Profile', fontsize=14, fontweight='bold')
    ax7.legend()
    ax7.grid(True, alpha=0.3)
    
    # 8. Rolling Sharpe Ratio
    ax8 = plt.subplot(4, 2, 8)
    # Calculate rolling Sharpe manually
    window = 60
    rolling_mean = portfolio_returns.rolling(window).mean() * 252  # Annualized
    rolling_std = portfolio_returns.rolling(window).std() * np.sqrt(252)  # Annualized
    rolling_sharpe = rolling_mean / rolling_std
    rolling_sharpe.plot(ax=ax8, color='purple', alpha=0.8)
    ax8.axhline(y=0, color='black', linestyle='-', alpha=0.3)
    ax8.set_title('60-Day Rolling Sharpe Ratio', fontsize=14, fontweight='bold')
    ax8.set_ylabel('Sharpe Ratio')
    ax8.grid(True, alpha=0.3)
    
    plt.tight_layout(pad=3.0)
    plt.savefig('/Users/mfy/crypto-portfolio-analysis/portfolio_analysis.png', 
                dpi=300, bbox_inches='tight')
    plt.show()
    
    print(f"Visualization saved to /Users/mfy/crypto-portfolio-analysis/portfolio_analysis.png")

def generate_html_report(portfolio_returns):
    """
    Generate comprehensive HTML report using quantstats
    
    Args:
        portfolio_returns (pd.Series): Portfolio returns
    """
    print("\nGenerating comprehensive HTML report...")
    
    # Generate HTML report
    qs.reports.html(portfolio_returns, 
                   output='/Users/mfy/crypto-portfolio-analysis/portfolio_report.html',
                   title='Equal Weight Crypto Portfolio Analysis')
    
    print("HTML report generated: /Users/mfy/crypto-portfolio-analysis/portfolio_report.html")

def main():
    """
    Main analysis function
    """
    print("Starting Cryptocurrency Portfolio Analysis...")
    print("=" * 60)
    
    # Load data
    price_data = load_data()
    if price_data is None:
        return
    
    # Calculate returns
    returns_data = calculate_returns(price_data)
    
    # Create equal-weight portfolio
    portfolio_returns = create_equal_weight_portfolio(returns_data)
    
    # Analyze individual performance
    individual_performance = analyze_individual_performance(returns_data, price_data)
    
    print("\n" + "="*60)
    print("INDIVIDUAL CRYPTOCURRENCY PERFORMANCE")
    print("="*60)
    print(individual_performance.to_string(index=False, float_format='%.4f'))
    
    # Generate portfolio analysis
    portfolio_metrics = generate_portfolio_analysis(portfolio_returns, price_data)
    
    # Create visualizations
    create_visualizations(portfolio_returns, returns_data, price_data)
    
    # Generate HTML report
    generate_html_report(portfolio_returns)
    
    # Save results to CSV
    individual_performance.to_csv('/Users/mfy/crypto-portfolio-analysis/individual_performance.csv', 
                                 index=False)
    
    portfolio_metrics_df = pd.DataFrame.from_dict(portfolio_metrics, orient='index', 
                                                 columns=['Value'])
    portfolio_metrics_df.to_csv('/Users/mfy/crypto-portfolio-analysis/portfolio_metrics.csv')
    
    print(f"\n" + "="*60)
    print("ANALYSIS COMPLETE")
    print("="*60)
    print("Generated files:")
    print("  - portfolio_analysis.png (visualizations)")
    print("  - portfolio_report.html (comprehensive report)")
    print("  - individual_performance.csv (individual crypto metrics)")
    print("  - portfolio_metrics.csv (portfolio summary metrics)")

if __name__ == "__main__":
    main()