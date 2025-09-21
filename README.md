# 🚀 Crypto Portfolio Analysis

A comprehensive cryptocurrency portfolio analysis tool that evaluates an equal-weight index of 8 major cryptocurrencies with advanced optimization strategies.

## 📊 **Key Results Summary**

### **🏆 Portfolio Performance (Equal-Weight Index)**
- **Total Return**: **50.98%** over ~10 months (Nov 2024 - Sep 2025)
- **Annualized Return**: **40.87%** 
- **Sharpe Ratio**: **0.88** (excellent risk-adjusted returns)
- **Maximum Drawdown**: **-52.16%** 
- **Win Rate**: **52.48%**
- **Volatility**: **58.21%** (annualized)

### **🎯 Top Performing Assets**
| Rank | Asset | Total Return | Sharpe Ratio | Latest Price |
|------|-------|--------------|--------------|--------------|
| 1 | **HYPE** | **725.89%** | **2.18** | $53.79 |
| 2 | **TRON** | **70.47%** | **0.82** | $0.35 |
| 3 | **BNB** | **64.54%** | **1.24** | $1,077.04 |
| 4 | **ETH** | **25.25%** | **0.61** | $4,482.99 |

## 🎨 **Color Palette for Dashboard**

```css
/* Primary Colors */
--primary-green: #00FFA7;    /* Success metrics, positive returns */
--primary-blue: #008EFF;     /* Neutral metrics, explanations */
--primary-purple: #9900FF;   /* Portfolio comparisons */

/* Light Variants */
--light-green: #C5E5E0;      /* Text highlights and labels */
--light-blue: #C6D8FF;       /* Explanation boxes */
--light-purple: #E2C6FF;     /* Portfolio labels */

/* Medium Variants */
--medium-green: #004C37;     /* Background elements */
--medium-blue: #004981;      /* Chart elements */
--medium-purple: #5B0083;    /* Insights sections */

/* Dark Variants */
--dark-green: #002811;       /* Background gradients */
--dark-blue: #011243;        /* Background gradients */
--dark-purple: #340045;      /* Special backgrounds */

/* Base Colors */
--black: #0A0A0A;
--white: #FFFFFF;
```

## 📁 **Data Files Structure**

### **📈 Core Analysis Data**
```
data/
├── crypto_prices.csv              # Raw daily price data for all 8 cryptocurrencies
├── individual_performance.csv     # Performance metrics for each crypto
├── portfolio_metrics.csv          # Equal-weight portfolio summary statistics
├── portfolio_optimization_results.csv  # 7 different optimization strategies
└── portfolio_weights_comparison.csv    # Portfolio allocation comparisons
```

### **📊 Analysis Reports**
```
reports/
├── portfolio_report.html          # Comprehensive quantstats HTML report
├── portfolio_analysis.png         # 8-panel analysis visualization
├── portfolio_optimization_comparison.png  # Strategy comparison charts
└── efficient_frontier.png         # Risk-return efficient frontier
```

### **🔧 Analysis Scripts**
```
scripts/
├── fetch_data.py                  # CoinGecko API data retrieval
├── portfolio_analysis.py          # Main quantstats analysis
└── portfolio_optimization.py      # PyPortfolioOpt optimization
```

## 📊 **Optimization Strategy Results**

| Strategy | Total Return | Annual Return | Sharpe Ratio | Max Drawdown | Allocation |
|----------|--------------|---------------|--------------|--------------|------------|
| **Max Sharpe** | **725.89%** | **478.88%** | **2.18** | -68.32% | 100% HYPE |
| **Max Return** | **89.20%** | **69.95%** | **1.49** | -28.26% | 93% BNB, 7% HYPE |
| **Momentum** | **73.10%** | **57.83%** | **1.08** | -51.57% | Multi-asset |
| **Min Volatility** | **64.54%** | **51.31%** | **1.24** | -29.01% | 100% BNB |
| **Equal Weight** | **50.98%** | **40.87%** | **0.88** | -52.16% | 12.5% each |
| **Risk Parity** | **41.15%** | **33.20%** | **0.80** | -50.16% | Risk-weighted |
| **Market Cap** | **36.07%** | **29.20%** | **0.74** | -57.19% | Price-weighted |

## 💡 **Key Insights for Dashboard**

### **🎯 Portfolio Optimization Insights**
1. **HYPE drove exceptional performance** - 725% return with 2.18 Sharpe ratio
2. **Equal-weight strategy provided good diversification** - Captured upside while managing risk
3. **BNB served as portfolio anchor** - Lower volatility with solid 64% returns
4. **Risk-adjusted returns were excellent** - 0.88 Sharpe ratio for equal-weight approach

### **📈 AI-Generated Metric Explanations**

#### **Total Return (50.98%)**
"Your equal-weight portfolio delivered exceptional returns of 50.98% over ~10 months. This significantly outperforms traditional investment benchmarks (S&P 500 averages ~10% annually). The diversified approach captured gains from multiple cryptocurrencies while managing risk through equal allocation."

#### **Sharpe Ratio (0.88)**
"A Sharpe ratio of 0.88 is excellent for cryptocurrency portfolios. This risk-adjusted return metric shows you're earning 0.88 units of return for each unit of risk taken. Values above 0.5 are considered good, above 1.0 are excellent."

#### **Maximum Drawdown (-52.16%)**
"The maximum drawdown of -52.16% represents the largest peak-to-trough decline. While significant, it's typical for crypto portfolios and shows resilience by recovering to deliver strong overall returns."

## 🔧 **Technical Implementation**

### **Data Sources**
- **CoinGecko API**: Historical price data for 8 cryptocurrencies
- **Period**: November 2024 - September 2025 (304 trading days)
- **Frequency**: Daily price data
- **Cryptocurrencies**: ETH, SOL, HYPE, BNB, AVAX, TRON, APTOS, SUI

### **Analysis Libraries Used**
- **quantstats**: Portfolio performance analytics
- **PyPortfolioOpt**: Portfolio optimization (Markowitz, risk parity, etc.)
- **pandas**: Data manipulation and analysis
- **matplotlib/seaborn**: Visualizations
- **numpy**: Numerical computations

### **Optimization Methods**
- **Mean-Variance Optimization**: Classic Markowitz approach
- **Risk Parity**: Equal risk contribution from each asset
- **Momentum Strategy**: Based on recent price performance
- **Minimum Volatility**: Lowest risk portfolio
- **Maximum Sharpe**: Best risk-adjusted returns

## 🚀 **Dashboard Requirements**

### **Essential Components**
1. **Key Metrics Cards** with AI explanations
   - Total Return, Sharpe Ratio, Max Drawdown, Win Rate
   - Interactive hover/click for detailed explanations

2. **Portfolio Strategy Comparison**
   - 7 optimization strategies ranked by performance
   - Visual comparison of risk vs return

3. **Individual Asset Performance**
   - HYPE (star performer), BNB (stability), ETH (consistent)
   - Performance metrics and analysis for each

4. **Interactive Visualizations**
   - Cumulative returns chart
   - Risk-return scatter plot  
   - Portfolio allocation comparison
   - Correlation heatmap

### **Recommended Dashboard Layout**
```
Header: Portfolio Overview & Period
├── Key Metrics Grid (6 cards with AI explanations)
├── Strategy Comparison Section
├── Individual Asset Performance
├── Interactive Charts Section
└── AI-Generated Insights & Recommendations
```

## 📈 **Data Format Examples**

### **Portfolio Metrics JSON**
```json
{
  "totalReturn": 0.5098,
  "annualizedReturn": 0.4087,
  "sharpeRatio": 0.88,
  "maxDrawdown": -0.5216,
  "winRate": 0.5248,
  "volatility": 0.5821
}
```

### **Individual Performance JSON**
```json
[
  {
    "symbol": "HYPE",
    "totalReturn": 7.2589,
    "annualizedReturn": 4.7888,
    "sharpeRatio": 2.18,
    "maxDrawdown": -0.6832,
    "latestPrice": 53.79
  }
]
```

### **Optimization Results JSON**
```json
{
  "Max Sharpe": {
    "totalReturn": 7.2589,
    "annualReturn": 4.7888,
    "sharpeRatio": 2.18,
    "maxDrawdown": -0.6832,
    "allocation": {"HYPE": 1.0}
  }
}
```

## 🎯 **Dashboard Features to Implement**

### **Interactive Elements**
- [ ] Metric cards with hover explanations
- [ ] Strategy comparison with sorting/filtering
- [ ] Asset performance drill-down
- [ ] Time period selection
- [ ] Portfolio rebalancing simulator

### **Visualizations**
- [ ] Cumulative returns line chart
- [ ] Risk-return scatter plot
- [ ] Portfolio allocation pie/donut charts
- [ ] Drawdown area chart
- [ ] Correlation heatmap
- [ ] Monthly returns calendar

### **AI Features**
- [ ] Dynamic metric explanations
- [ ] Performance insights
- [ ] Optimization recommendations
- [ ] Risk assessment analysis

## 🔗 **Next Steps**

1. **Clone this repository** to bolt.new
2. **Use the CSV data files** for dynamic content
3. **Implement the color palette** for consistent branding  
4. **Build interactive components** based on the data structure
5. **Add AI explanations** for each metric and insight

## 📊 **Performance Summary**

**Bottom Line**: The equal-weight cryptocurrency portfolio delivered **50.98% returns** with a **0.88 Sharpe ratio** over 10 months, significantly outperforming traditional benchmarks while maintaining reasonable diversification. HYPE was the star performer (725% returns), while BNB provided stability. The analysis shows multiple optimization opportunities for enhanced risk-adjusted returns.

---

*Analysis Period: November 29, 2024 - September 21, 2025 | 8 Cryptocurrencies | 304 Trading Days*