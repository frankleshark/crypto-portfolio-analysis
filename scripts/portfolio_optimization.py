#!/usr/bin/env python3
"""
Crypto Portfolio Optimization - Advanced Analysis Script
Compares different portfolio weighting strategies using PyPortfolioOpt
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from pypfopt import EfficientFrontier, risk_models, expected_returns
from pypfopt.risk_models import CovarianceShrinkage, sample_cov
from pypfopt.expected_returns import mean_historical_return, ema_historical_return
from pypfopt.efficient_frontier import EfficientFrontier
from pypfopt.discrete_allocation import DiscreteAllocation, get_latest_prices
from pypfopt import objective_functions
import quantstats as qs
import warnings
warnings.filterwarnings('ignore')

# Set style for better plots
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

def load_data():
    """Load cryptocurrency price and returns data"""
    try:
        price_data = pd.read_csv('/Users/mfy/crypto-portfolio-analysis/crypto_prices.csv', 
                                index_col=0, parse_dates=True)
        returns_data = price_data.pct_change().dropna()
        print(f"Loaded data for {len(price_data.columns)} cryptocurrencies")
        print(f"Date range: {price_data.index[0]} to {price_data.index[-1]}")
        return price_data, returns_data
    except FileNotFoundError:
        print("Error: crypto_prices.csv not found. Please run fetch_data.py first.")
        return None, None

def calculate_portfolio_performance(weights, returns_data):
    """
    Calculate portfolio performance metrics for given weights
    
    Args:
        weights (dict or pd.Series): Portfolio weights
        returns_data (pd.DataFrame): Returns data
    
    Returns:
        dict: Performance metrics
    """
    if isinstance(weights, dict):
        weights = pd.Series(weights)
    
    # Align weights with returns columns
    aligned_weights = weights.reindex(returns_data.columns).fillna(0)
    
    # Calculate portfolio returns
    portfolio_returns = returns_data.dot(aligned_weights)
    
    # Calculate metrics
    total_return = (1 + portfolio_returns).cumprod().iloc[-1] - 1
    annual_return = qs.stats.cagr(portfolio_returns)
    annual_vol = qs.stats.volatility(portfolio_returns)
    sharpe = qs.stats.sharpe(portfolio_returns)
    max_dd = qs.stats.max_drawdown(portfolio_returns)
    
    return {
        'Total Return': total_return,
        'Annual Return': annual_return,
        'Annual Volatility': annual_vol,
        'Sharpe Ratio': sharpe,
        'Max Drawdown': max_dd,
        'Weights': aligned_weights.to_dict()
    }

def optimize_portfolios(price_data, returns_data):
    """
    Generate different optimized portfolios using various strategies
    
    Args:
        price_data (pd.DataFrame): Price data
        returns_data (pd.DataFrame): Returns data
    
    Returns:
        dict: Dictionary containing different portfolio strategies
    """
    portfolios = {}
    
    # Calculate expected returns and covariance matrix
    mu = expected_returns.mean_historical_return(price_data, frequency=252)
    S = risk_models.sample_cov(price_data, frequency=252)
    
    print("\n" + "="*60)
    print("PORTFOLIO OPTIMIZATION RESULTS")
    print("="*60)
    
    # 1. Equal Weight Portfolio (our baseline)
    equal_weights = {asset: 1/len(price_data.columns) for asset in price_data.columns}
    portfolios['Equal Weight'] = calculate_portfolio_performance(equal_weights, returns_data)
    print(f"✅ Equal Weight Portfolio completed")
    
    # 2. Maximum Sharpe Ratio Portfolio
    try:
        ef = EfficientFrontier(mu, S)
        ef.max_sharpe()
        max_sharpe_weights = ef.clean_weights()
        portfolios['Max Sharpe'] = calculate_portfolio_performance(max_sharpe_weights, returns_data)
        print(f"✅ Maximum Sharpe Portfolio completed")
    except Exception as e:
        print(f"❌ Max Sharpe optimization failed: {e}")
    
    # 3. Minimum Volatility Portfolio
    try:
        ef = EfficientFrontier(mu, S)
        ef.min_volatility()
        min_vol_weights = ef.clean_weights()
        portfolios['Min Volatility'] = calculate_portfolio_performance(min_vol_weights, returns_data)
        print(f"✅ Minimum Volatility Portfolio completed")
    except Exception as e:
        print(f"❌ Min Volatility optimization failed: {e}")
    
    # 4. Maximum Return Portfolio (subject to volatility constraint)
    try:
        ef = EfficientFrontier(mu, S)
        ef.efficient_return(target_return=mu.mean() * 1.2)  # Target 20% above mean
        max_return_weights = ef.clean_weights()
        portfolios['Max Return'] = calculate_portfolio_performance(max_return_weights, returns_data)
        print(f"✅ Maximum Return Portfolio completed")
    except Exception as e:
        print(f"❌ Max Return optimization failed: {e}")
        
    # 5. Risk Parity Portfolio (equal contribution to portfolio risk)
    try:
        ef = EfficientFrontier(mu, S)
        ef.add_objective(objective_functions.L2_reg, gamma=0.1)  # Add regularization
        # Manual risk parity approximation
        inv_vol_weights = 1 / np.sqrt(np.diag(S))
        inv_vol_weights = inv_vol_weights / inv_vol_weights.sum()
        risk_parity_weights = dict(zip(price_data.columns, inv_vol_weights))
        portfolios['Risk Parity'] = calculate_portfolio_performance(risk_parity_weights, returns_data)
        print(f"✅ Risk Parity Portfolio completed")
    except Exception as e:
        print(f"❌ Risk Parity optimization failed: {e}")
    
    # 6. Market Cap Weight (use price as proxy for market cap)
    try:
        latest_prices = price_data.iloc[-1]
        market_cap_weights = latest_prices / latest_prices.sum()
        portfolios['Market Cap'] = calculate_portfolio_performance(market_cap_weights, returns_data)
        print(f"✅ Market Cap Weighted Portfolio completed")
    except Exception as e:
        print(f"❌ Market Cap weighting failed: {e}")
    
    # 7. Momentum Portfolio (based on past returns)
    try:
        # Calculate 60-day momentum
        momentum_scores = price_data.pct_change(60).iloc[-1]
        momentum_scores = momentum_scores[momentum_scores > 0]  # Only positive momentum
        if len(momentum_scores) > 0:
            momentum_weights = momentum_scores / momentum_scores.sum()
            # Fill missing weights with 0
            full_momentum_weights = pd.Series(0, index=price_data.columns)
            full_momentum_weights[momentum_scores.index] = momentum_weights
            portfolios['Momentum'] = calculate_portfolio_performance(full_momentum_weights, returns_data)
            print(f"✅ Momentum Portfolio completed")
    except Exception as e:
        print(f"❌ Momentum portfolio failed: {e}")
    
    return portfolios

def create_comparison_analysis(portfolios):
    """
    Create comprehensive comparison analysis of different portfolio strategies
    
    Args:
        portfolios (dict): Dictionary of portfolio results
    """
    # Create comparison DataFrame
    comparison_data = []
    for name, metrics in portfolios.items():
        comparison_data.append({
            'Strategy': name,
            'Total Return': metrics['Total Return'],
            'Annual Return': metrics['Annual Return'],
            'Annual Volatility': metrics['Annual Volatility'],
            'Sharpe Ratio': metrics['Sharpe Ratio'],
            'Max Drawdown': metrics['Max Drawdown']
        })
    
    comparison_df = pd.DataFrame(comparison_data)
    comparison_df = comparison_df.set_index('Strategy')
    
    print("\n" + "="*80)
    print("PORTFOLIO STRATEGY COMPARISON")
    print("="*80)
    print(comparison_df.round(4))
    
    # Find best performers
    best_return = comparison_df['Total Return'].idxmax()
    best_sharpe = comparison_df['Sharpe Ratio'].idxmax()
    lowest_vol = comparison_df['Annual Volatility'].idxmin()
    lowest_dd = comparison_df['Max Drawdown'].idxmax()  # Least negative
    
    print(f"\n🏆 BEST PERFORMERS:")
    print(f"📈 Highest Total Return: {best_return} ({comparison_df.loc[best_return, 'Total Return']:.2%})")
    print(f"⚡ Best Sharpe Ratio: {best_sharpe} ({comparison_df.loc[best_sharpe, 'Sharpe Ratio']:.2f})")
    print(f"🛡️ Lowest Volatility: {lowest_vol} ({comparison_df.loc[lowest_vol, 'Annual Volatility']:.2%})")
    print(f"💪 Smallest Max Drawdown: {lowest_dd} ({comparison_df.loc[lowest_dd, 'Max Drawdown']:.2%})")
    
    return comparison_df

def create_weights_comparison(portfolios):
    """
    Create visualization comparing portfolio weights across strategies
    
    Args:
        portfolios (dict): Dictionary of portfolio results
    """
    # Create weights DataFrame
    weights_data = {}
    for strategy, metrics in portfolios.items():
        weights_data[strategy] = metrics['Weights']
    
    weights_df = pd.DataFrame(weights_data).fillna(0)
    
    # Create visualization
    fig, axes = plt.subplots(2, 2, figsize=(16, 12))
    
    # 1. Weights heatmap
    ax1 = axes[0, 0]
    sns.heatmap(weights_df, annot=True, fmt='.3f', cmap='RdYlBu_r', 
                center=0, ax=ax1, cbar_kws={'shrink': 0.8})
    ax1.set_title('Portfolio Weights by Strategy', fontsize=14, fontweight='bold')
    ax1.set_ylabel('Cryptocurrency')
    
    # 2. Weights bar chart (stacked)
    ax2 = axes[0, 1]
    weights_df.T.plot(kind='bar', stacked=True, ax=ax2, width=0.8)
    ax2.set_title('Portfolio Allocation Comparison', fontsize=14, fontweight='bold')
    ax2.set_ylabel('Weight')
    ax2.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
    ax2.tick_params(axis='x', rotation=45)
    
    # 3. Risk-Return scatter plot
    ax3 = axes[1, 0]
    comparison_data = []
    colors = plt.cm.Set3(np.linspace(0, 1, len(portfolios)))
    
    for i, (name, metrics) in enumerate(portfolios.items()):
        ax3.scatter(metrics['Annual Volatility'], metrics['Annual Return'], 
                   s=200, alpha=0.7, label=name, color=colors[i])
        ax3.annotate(name, (metrics['Annual Volatility'], metrics['Annual Return']),
                    xytext=(5, 5), textcoords='offset points', fontsize=10)
    
    ax3.set_xlabel('Annual Volatility')
    ax3.set_ylabel('Annual Return')
    ax3.set_title('Risk-Return Profile by Strategy', fontsize=14, fontweight='bold')
    ax3.grid(True, alpha=0.3)
    ax3.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
    
    # 4. Sharpe Ratio comparison
    ax4 = axes[1, 1]
    sharpe_ratios = [metrics['Sharpe Ratio'] for metrics in portfolios.values()]
    strategy_names = list(portfolios.keys())
    
    bars = ax4.bar(strategy_names, sharpe_ratios, color=colors[:len(portfolios)])
    ax4.set_title('Sharpe Ratio Comparison', fontsize=14, fontweight='bold')
    ax4.set_ylabel('Sharpe Ratio')
    ax4.tick_params(axis='x', rotation=45)
    ax4.grid(True, alpha=0.3, axis='y')
    
    # Add value labels on bars
    for bar, value in zip(bars, sharpe_ratios):
        height = bar.get_height()
        ax4.text(bar.get_x() + bar.get_width()/2., height + 0.02,
                f'{value:.2f}', ha='center', va='bottom')
    
    plt.tight_layout()
    plt.savefig('/Users/mfy/crypto-portfolio-analysis/portfolio_optimization_comparison.png', 
                dpi=300, bbox_inches='tight')
    plt.show()
    
    print(f"\n📊 Optimization comparison chart saved to: portfolio_optimization_comparison.png")
    
    return weights_df

def generate_efficient_frontier(price_data, returns_data):
    """
    Generate and plot the efficient frontier
    
    Args:
        price_data (pd.DataFrame): Price data
        returns_data (pd.DataFrame): Returns data
    """
    try:
        # Calculate expected returns and covariance matrix
        mu = expected_returns.mean_historical_return(price_data, frequency=252)
        S = risk_models.sample_cov(price_data, frequency=252)
        
        # Generate efficient frontier
        ef = EfficientFrontier(mu, S)
        
        # Get frontier points
        frontier_volatility = []
        frontier_returns = []
        frontier_sharpe = []
        
        # Generate points along the frontier
        target_returns = np.linspace(mu.min(), mu.max(), 50)
        
        for target_return in target_returns:
            try:
                ef_temp = EfficientFrontier(mu, S)
                ef_temp.efficient_return(target_return)
                ret, vol, sharpe = ef_temp.portfolio_performance()
                
                frontier_returns.append(ret)
                frontier_volatility.append(vol)
                frontier_sharpe.append(sharpe)
            except:
                continue
        
        # Plot efficient frontier
        plt.figure(figsize=(12, 8))
        
        # Plot frontier
        plt.scatter(frontier_volatility, frontier_returns, c=frontier_sharpe, 
                   cmap='viridis', alpha=0.7, s=50)
        plt.colorbar(label='Sharpe Ratio')
        
        # Plot individual assets
        individual_returns = [mu[asset] for asset in price_data.columns]
        individual_volatility = [np.sqrt(S.loc[asset, asset]) for asset in price_data.columns]
        
        plt.scatter(individual_volatility, individual_returns, 
                   color='red', alpha=0.8, s=100, marker='o', label='Individual Assets')
        
        # Add labels for assets
        for i, asset in enumerate(price_data.columns):
            plt.annotate(asset, (individual_volatility[i], individual_returns[i]),
                        xytext=(5, 5), textcoords='offset points', fontsize=10)
        
        # Highlight key portfolios if they exist
        # This would require running the optimization first and storing results
        
        plt.xlabel('Annual Volatility')
        plt.ylabel('Annual Return')
        plt.title('Efficient Frontier - Cryptocurrency Portfolio', fontsize=16, fontweight='bold')
        plt.legend()
        plt.grid(True, alpha=0.3)
        
        plt.savefig('/Users/mfy/crypto-portfolio-analysis/efficient_frontier.png', 
                    dpi=300, bbox_inches='tight')
        plt.show()
        
        print(f"📈 Efficient frontier chart saved to: efficient_frontier.png")
        
    except Exception as e:
        print(f"❌ Efficient frontier generation failed: {e}")

def main():
    """Main optimization analysis function"""
    print("Starting Advanced Portfolio Optimization Analysis...")
    print("=" * 70)
    
    # Load data
    price_data, returns_data = load_data()
    if price_data is None or returns_data is None:
        return
    
    # Run portfolio optimizations
    portfolios = optimize_portfolios(price_data, returns_data)
    
    if not portfolios:
        print("❌ No successful optimizations completed")
        return
    
    # Create comparison analysis
    comparison_df = create_comparison_analysis(portfolios)
    
    # Create weights comparison visualization
    weights_df = create_weights_comparison(portfolios)
    
    # Generate efficient frontier
    generate_efficient_frontier(price_data, returns_data)
    
    # Save results
    comparison_df.to_csv('/Users/mfy/crypto-portfolio-analysis/portfolio_optimization_results.csv')
    weights_df.to_csv('/Users/mfy/crypto-portfolio-analysis/portfolio_weights_comparison.csv')
    
    print(f"\n" + "="*70)
    print("OPTIMIZATION ANALYSIS COMPLETE")
    print("="*70)
    print("Generated files:")
    print("  - portfolio_optimization_results.csv (performance comparison)")
    print("  - portfolio_weights_comparison.csv (weight allocations)")
    print("  - portfolio_optimization_comparison.png (comparison charts)")
    print("  - efficient_frontier.png (efficient frontier plot)")
    
    # Provide recommendations
    print(f"\n💡 RECOMMENDATIONS:")
    best_overall = comparison_df['Sharpe Ratio'].idxmax()
    print(f"🎯 Based on risk-adjusted returns (Sharpe ratio), consider the {best_overall} strategy")
    print(f"📊 The equal-weight portfolio provides good diversification as a baseline")
    print(f"⚖️ Consider your risk tolerance when choosing between strategies")

if __name__ == "__main__":
    main()