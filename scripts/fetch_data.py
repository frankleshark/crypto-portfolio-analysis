#!/usr/bin/env python3
"""
Crypto Portfolio Analysis - Data Retrieval Script
Fetches historical price data for 8 cryptocurrencies from CoinGecko API
"""

import requests
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import time
import json

# Configuration
API_KEY = "CG-P48dvmsF8VwaAR68yt274Dvu"
BASE_URL = "https://api.coingecko.com/api/v3"

# Cryptocurrency mapping: Symbol -> CoinGecko ID
CRYPTO_MAPPING = {
    'ETH': 'ethereum',
    'SOL': 'solana', 
    'HYPE': 'hyperliquid',
    'BNB': 'binancecoin',
    'AVAX': 'avalanche-2',
    'TRON': 'tron',
    'APTOS': 'aptos',
    'SUI': 'sui'
}

def fetch_crypto_data(coin_id, vs_currency='usd', days=365, interval='daily'):
    """
    Fetch historical price data for a single cryptocurrency from CoinGecko API
    
    Args:
        coin_id (str): CoinGecko coin ID
        vs_currency (str): Target currency (default: 'usd')
        days (int): Number of days of data (default: 365)
        interval (str): Data interval (default: 'daily')
    
    Returns:
        dict: API response containing prices, market_caps, and total_volumes
    """
    url = f"{BASE_URL}/coins/{coin_id}/market_chart"
    
    params = {
        'vs_currency': vs_currency,
        'days': days,
        'interval': interval
    }
    
    headers = {
        'x-cg-demo-api-key': API_KEY
    }
    
    try:
        print(f"Fetching data for {coin_id}...")
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        print(f"Successfully fetched {len(data.get('prices', []))} price points for {coin_id}")
        return data
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data for {coin_id}: {e}")
        return None

def process_price_data(raw_data, symbol):
    """
    Process raw CoinGecko API response into clean price data
    
    Args:
        raw_data (dict): Raw API response
        symbol (str): Cryptocurrency symbol
    
    Returns:
        pd.DataFrame: DataFrame with datetime index and price column
    """
    if not raw_data or 'prices' not in raw_data:
        print(f"No price data available for {symbol}")
        return pd.DataFrame()
    
    prices = raw_data['prices']
    
    # Convert to DataFrame
    df = pd.DataFrame(prices, columns=['timestamp', 'price'])
    
    # Convert timestamp to datetime
    df['datetime'] = pd.to_datetime(df['timestamp'], unit='ms')
    df = df.set_index('datetime')
    df = df.drop('timestamp', axis=1)
    
    # Rename price column to symbol
    df.columns = [symbol]
    
    return df

def fetch_all_crypto_data():
    """
    Fetch historical price data for all cryptocurrencies in our portfolio
    
    Returns:
        pd.DataFrame: DataFrame with datetime index and price columns for each crypto
    """
    all_data = pd.DataFrame()
    
    for symbol, coin_id in CRYPTO_MAPPING.items():
        # Add delay between API calls to respect rate limits
        if len(all_data.columns) > 0:
            print("Waiting 1 second to respect API rate limits...")
            time.sleep(1)
        
        # Fetch raw data
        raw_data = fetch_crypto_data(coin_id)
        
        if raw_data:
            # Process data
            processed_data = process_price_data(raw_data, symbol)
            
            if not processed_data.empty:
                if all_data.empty:
                    all_data = processed_data
                else:
                    all_data = all_data.join(processed_data, how='outer')
    
    # Sort by date
    all_data = all_data.sort_index()
    
    # Forward fill missing values (in case of different data availability)
    all_data = all_data.fillna(method='ffill')
    
    # Remove any remaining NaN values at the beginning
    all_data = all_data.dropna()
    
    print(f"\nData collection complete!")
    print(f"Date range: {all_data.index[0]} to {all_data.index[-1]}")
    print(f"Total trading days: {len(all_data)}")
    print(f"Cryptocurrencies: {list(all_data.columns)}")
    
    return all_data

def save_data(data, filename='crypto_prices.csv'):
    """
    Save the cryptocurrency price data to CSV
    
    Args:
        data (pd.DataFrame): Price data
        filename (str): Output filename
    """
    filepath = f"/Users/mfy/crypto-portfolio-analysis/{filename}"
    data.to_csv(filepath)
    print(f"Data saved to {filepath}")

if __name__ == "__main__":
    # Fetch all cryptocurrency data
    crypto_data = fetch_all_crypto_data()
    
    if not crypto_data.empty:
        # Save to CSV
        save_data(crypto_data)
        
        # Display summary statistics
        print("\n" + "="*60)
        print("DATA SUMMARY")
        print("="*60)
        print(crypto_data.describe())
        
        print("\n" + "="*60)
        print("LATEST PRICES (USD)")
        print("="*60)
        latest_prices = crypto_data.iloc[-1]
        for symbol, price in latest_prices.items():
            print(f"{symbol:>6}: ${price:,.2f}")
    else:
        print("Failed to fetch cryptocurrency data")