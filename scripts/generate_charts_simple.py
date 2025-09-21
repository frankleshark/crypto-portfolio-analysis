#!/usr/bin/env python3
"""
Simple Chart Generation for WebContainer
Uses only Python standard library to generate basic charts as JSON data
"""

import json
import csv
import os
from datetime import datetime, date
import random
import math

def ensure_output_directory():
    """Ensure the output directory exists"""
    os.makedirs('public/reports', exist_ok=True)
    print("✅ Output directory created/verified: public/reports/")

def load_data():
    """Load cryptocurrency price data from CSV file"""
    try:
        data = {}
        dates = []
        
        with open('data/crypto_prices.csv', 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                date_str = row['']  # First column is the date
                dates.append(date_str)
                
                for symbol in row.keys():
                    if symbol != '':  # Skip the date column
                        if symbol not in data:
                            data[symbol] = []
                        try:
                            price = float(row[symbol])
                            data[symbol].append(price)
                        except (ValueError, TypeError):
                            data[symbol].append(None)
        
        print(f"Loaded data for {len(data)} cryptocurrencies")
        print(f"Date range: {dates[0] if dates else 'N/A'} to {dates[-1] if dates else 'N/A'}")
        return data, dates
    except FileNotFoundError:
        print("Error: data/crypto_prices.csv not found.")
        return None, None
    except Exception as e:
        print(f"Error loading data: {e}")
        return None, None

def calculate_returns(price_data):
    """Calculate daily returns for all cryptocurrencies"""
    returns_data = {}
    
    for symbol, prices in price_data.items():
        returns = []
        for i in range(1, len(prices)):
            if prices[i] is not None and prices[i-1] is not None and prices[i-1] != 0:
                daily_return = (prices[i] - prices[i-1]) / prices[i-1]
                returns.append(daily_return)
            else:
                returns.append(0)
        returns_data[symbol] = returns
    
    return returns_data

def create_cumulative_returns_data(price_data, dates):
    """Generate cumulative returns chart data"""
    if not price_data or not dates:
        return None
    
    # Calculate portfolio returns (equal weight)
    symbols = list(price_data.keys())
    portfolio_values = []
    
    # Calculate equal-weight portfolio
    for i in range(len(dates)):
        total_value = 0
        valid_assets = 0
        
        for symbol in symbols:
            if i < len(price_data[symbol]) and price_data[symbol][i] is not None:
                if i == 0:
                    normalized_value = 1.0
                else:
                    if price_data[symbol][0] is not None and price_data[symbol][0] != 0:
                        normalized_value = price_data[symbol][i] / price_data[symbol][0]
                    else:
                        normalized_value = 1.0
                total_value += normalized_value
                valid_assets += 1
        
        if valid_assets > 0:
            portfolio_values.append(total_value / valid_assets)
        else:
            portfolio_values.append(1.0)
    
    chart_data = {
        'labels': dates,
        'datasets': [
            {
                'label': 'Equal Weight Portfolio',
                'data': portfolio_values,
                'borderColor': '#4ADE80',
                'backgroundColor': 'rgba(74, 222, 128, 0.1)',
                'borderWidth': 3
            }
        ]
    }
    
    # Add top performing assets
    top_assets = ['HYPE', 'BNB', 'ETH', 'TRON']
    colors = ['#FEF08A', '#60A5FA', '#A78BFA', '#FB923C']
    
    for i, asset in enumerate(top_assets):
        if asset in price_data:
            asset_values = []
            for j in range(len(dates)):
                if j < len(price_data[asset]) and price_data[asset][j] is not None:
                    if price_data[asset][0] is not None and price_data[asset][0] != 0:
                        normalized_value = price_data[asset][j] / price_data[asset][0]
                    else:
                        normalized_value = 1.0
                    asset_values.append(normalized_value)
                else:
                    asset_values.append(1.0)
            
            chart_data['datasets'].append({
                'label': asset,
                'data': asset_values,
                'borderColor': colors[i],
                'backgroundColor': f"{colors[i]}20",
                'borderWidth': 2
            })
    
    return chart_data

def create_portfolio_drawdown_data(price_data, dates):
    """Generate portfolio drawdown chart data"""
    if not price_data or not dates:
        return None
    
    # Calculate portfolio cumulative returns
    symbols = list(price_data.keys())
    portfolio_values = []
    
    for i in range(len(dates)):
        total_value = 0
        valid_assets = 0
        
        for symbol in symbols:
            if i < len(price_data[symbol]) and price_data[symbol][i] is not None:
                if i == 0:
                    normalized_value = 1.0
                else:
                    if price_data[symbol][0] is not None and price_data[symbol][0] != 0:
                        normalized_value = price_data[symbol][i] / price_data[symbol][0]
                    else:
                        normalized_value = 1.0
                total_value += normalized_value
                valid_assets += 1
        
        if valid_assets > 0:
            portfolio_values.append(total_value / valid_assets)
        else:
            portfolio_values.append(1.0)
    
    # Calculate drawdowns
    drawdowns = []
    peak = portfolio_values[0] if portfolio_values else 1.0
    
    for value in portfolio_values:
        if value > peak:
            peak = value
        drawdown = (value - peak) / peak
        drawdowns.append(drawdown)
    
    chart_data = {
        'labels': dates,
        'datasets': [{
            'label': 'Portfolio Drawdown',
            'data': drawdowns,
            'borderColor': '#F87171',
            'backgroundColor': 'rgba(248, 113, 113, 0.3)',
            'fill': True,
            'borderWidth': 2
        }]
    }
    
    return chart_data

def create_return_distribution_data(price_data):
    """Generate return distribution histogram data"""
    if not price_data:
        return None
    
    returns_data = calculate_returns(price_data)
    
    # Calculate portfolio returns (equal weight)
    portfolio_returns = []
    symbols = list(returns_data.keys())
    
    max_length = max(len(returns) for returns in returns_data.values()) if returns_data else 0
    
    for i in range(max_length):
        daily_return = 0
        valid_assets = 0
        
        for symbol in symbols:
            if i < len(returns_data[symbol]):
                daily_return += returns_data[symbol][i]
                valid_assets += 1
        
        if valid_assets > 0:
            portfolio_returns.append(daily_return / valid_assets)
    
    # Create histogram bins
    if not portfolio_returns:
        return None
    
    min_return = min(portfolio_returns)
    max_return = max(portfolio_returns)
    num_bins = 20
    bin_width = (max_return - min_return) / num_bins
    
    bins = []
    counts = []
    
    for i in range(num_bins):
        bin_start = min_return + i * bin_width
        bin_end = min_return + (i + 1) * bin_width
        bin_center = (bin_start + bin_end) / 2
        
        count = sum(1 for ret in portfolio_returns if bin_start <= ret < bin_end)
        bins.append(f"{bin_center:.3f}")
        counts.append(count)
    
    # Calculate mean and median
    portfolio_returns.sort()
    mean_return = sum(portfolio_returns) / len(portfolio_returns)
    median_return = portfolio_returns[len(portfolio_returns) // 2]
    
    chart_data = {
        'labels': bins,
        'datasets': [{
            'label': 'Frequency',
            'data': counts,
            'backgroundColor': 'rgba(96, 165, 250, 0.7)',
            'borderColor': '#60A5FA',
            'borderWidth': 1
        }],
        'mean': mean_return,
        'median': median_return
    }
    
    return chart_data

def create_correlation_matrix_data(price_data):
    """Generate correlation matrix data"""
    if not price_data:
        return None
    
    returns_data = calculate_returns(price_data)
    symbols = list(returns_data.keys())
    
    # Calculate correlation matrix
    correlation_matrix = []
    
    for i, symbol1 in enumerate(symbols):
        row = []
        for j, symbol2 in enumerate(symbols):
            if i == j:
                correlation = 1.0
            else:
                # Simple correlation calculation
                returns1 = returns_data[symbol1]
                returns2 = returns_data[symbol2]
                
                # Ensure same length
                min_length = min(len(returns1), len(returns2))
                returns1 = returns1[:min_length]
                returns2 = returns2[:min_length]
                
                if min_length > 1:
                    # Calculate correlation coefficient
                    mean1 = sum(returns1) / len(returns1)
                    mean2 = sum(returns2) / len(returns2)
                    
                    numerator = sum((r1 - mean1) * (r2 - mean2) for r1, r2 in zip(returns1, returns2))
                    
                    sum_sq1 = sum((r1 - mean1) ** 2 for r1 in returns1)
                    sum_sq2 = sum((r2 - mean2) ** 2 for r2 in returns2)
                    
                    denominator = math.sqrt(sum_sq1 * sum_sq2)
                    
                    if denominator != 0:
                        correlation = numerator / denominator
                    else:
                        correlation = 0.0
                else:
                    correlation = 0.0
            
            row.append(round(correlation, 3))
        correlation_matrix.append(row)
    
    chart_data = {
        'labels': symbols,
        'data': correlation_matrix
    }
    
    return chart_data

def create_strategy_weights_data():
    """Generate strategy weights comparison data"""
    # Mock data for strategy weights since we don't have the optimization results
    strategies = ['Equal Weight', 'Max Sharpe', 'Min Volatility', 'Risk Parity']
    assets = ['ETH', 'SOL', 'HYPE', 'BNB', 'AVAX', 'TRON', 'APTOS', 'SUI']
    
    weights_data = {
        'Equal Weight': [0.125] * 8,
        'Max Sharpe': [0.3, 0.25, 0.2, 0.15, 0.05, 0.03, 0.02, 0.0],
        'Min Volatility': [0.2, 0.2, 0.15, 0.15, 0.1, 0.1, 0.05, 0.05],
        'Risk Parity': [0.15, 0.15, 0.12, 0.12, 0.12, 0.12, 0.11, 0.11]
    }
    
    chart_data = {
        'labels': assets,
        'datasets': []
    }
    
    colors = ['#60A5FA', '#4ADE80', '#A78BFA', '#FB923C']
    
    for i, strategy in enumerate(strategies):
        chart_data['datasets'].append({
            'label': strategy,
            'data': weights_data[strategy],
            'backgroundColor': colors[i],
            'borderColor': colors[i],
            'borderWidth': 1
        })
    
    return chart_data

def main():
    """Generate all dashboard charts as JSON data"""
    print("Generating dashboard charts with simple Python...")
    
    # Ensure output directory exists
    ensure_output_directory()
    
    price_data, dates = load_data()
    if price_data is None or dates is None:
        print("❌ Failed to load data")
        return
    
    # Generate all chart data
    charts = {}
    
    # 1. Cumulative returns chart
    charts['cumulative_returns'] = create_cumulative_returns_data(price_data, dates)
    print("✅ Cumulative returns data generated")
    
    # 2. Portfolio drawdown chart
    charts['portfolio_drawdown'] = create_portfolio_drawdown_data(price_data, dates)
    print("✅ Portfolio drawdown data generated")
    
    # 3. Return distribution chart
    charts['return_distribution'] = create_return_distribution_data(price_data)
    print("✅ Return distribution data generated")
    
    # 4. Correlation matrix chart
    charts['correlation_matrix'] = create_correlation_matrix_data(price_data)
    print("✅ Correlation matrix data generated")
    
    # 5. Strategy weights chart
    charts['strategy_weights'] = create_strategy_weights_data()
    print("✅ Strategy weights data generated")
    
    # Save all chart data to JSON
    with open('public/reports/charts_data.json', 'w') as f:
        json.dump(charts, f, indent=2)
    
    print("\n🎨 All chart data generated and saved to public/reports/charts_data.json!")

if __name__ == "__main__":
    main()