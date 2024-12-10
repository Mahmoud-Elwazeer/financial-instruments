import mongoose from 'mongoose'

const Schema = mongoose.Schema;

// const metadata = new Schema({
//     symbol: { type: String, unique: true, ref: 'Exchange',  required: true },   // Unique identifier
//     source: { type: String, required: true },
//     ticker: { type: String, required: true },
//     code: { type: String, required: true },
//     type: { type: String, required: true },
//     name: { type: String, required: true },
//     exchange: { type: String, required: true },
//     currency: { type: String, required: true },
//     countryName: { type: String, required: true },
//     countryIso: { type: String, required: true },
//     sector: { type: String, default: "" },
//     industry: { type: String, default: "" },
//     description: { type: String, default: "NA" },
//     isin: { type: String, default: "" },
//     primaryTicker: { type: String, default: "" },
//     fullTimeEmployees: { type: Number, default: 0 },
//     updatedAt: { type: Date, required: true },
//     cusip: { type: String, default: "" },
//     logoURL: { type: String, default: "" },
//     cik: { type: String, default: "" },
//     employerIdNumber: { type: String, default: "" },
//     fiscalYearEnd: { type: String, default: "" },
//     ipoDate: { type: Date, default: new Date("0001-01-01") },
//     validUntil: { type: Date, required: true },
//     internationalDomestic: { type: String, default: "" },
//     gicSector: { type: String, default: "" },
//     gicGroup: { type: String, default: "" },
//     gicIndustry: { type: String, default: "" },
//     gicSubIndustry: { type: String, default: "" },
//     addressDetails: { type: Schema.Types.Mixed, default: null },
//     phone: { type: String, default: "" },
//     webUrl: { type: String, default: "" },
//     category: { type: String, required: true },
//     fundSummary: { type: String, default: "" },
//     fundFamily: { type: String, default: "" },
//     fundFiscalYearEnd: { type: String, default: "" },
//     officers: [Schema.Types.Mixed],
//     exchangeMarket: { type: String, default: "" },
//     fundCategory: { type: String, default: "" },
//     fundStyle: { type: String, default: "" },
//     homeCategory: { type: String, default: "" },
//     isDelisted: { type: Boolean, default: false },                // Category
//     marketCapitalization: {
//         value: { type: Number, default: 0 },
//         dominance: { type: Number, default: 0 },
//         diluted: { type: Number, default: 0 },
//         average: { type: Number, default: 0 },
//         bucket: [
//         {
//             category: { type: String, default: '' },
//             size: { type: String, default: '' },               // Market size (e.g., Big, Mega)
//             categoryAverage: { type: Number, default: 0 },
//             benchmark: { type: Number, default: 0 },
//             portfolioPercent: { type: Number, default: 0 },
//             value: { type: Number, default: 0 },
//         },
//         ],
//     },
//     technicals: {
//         beta: { type: Number, default: 0 },
//         week52High: { type: Number, default: 0 },
//         week52Low: { type: Number, default: 0 },
//         ma50Day: { type: Number, default: 0 },
//         ma200Day: { type: Number, default: 0 },
//     },
//     exchangeTradedFundDetails: {
//         domicile: { type: String, default: '' },
//         yield: { type: Number, default: 0 },
//         companyName: { type: String, default: '' },
//         companyURL: { type: String, default: '' },
//         inceptionDate: { type: Date, default: null },
//         ongoingCharge: { type: String, default: '' },
//         totalAssets: { type: Number, default: 0 },
//         performance: {
//         oneYearVolatility: { type: Number, default: 0 },
//         threeYearVolatility: { type: Number, default: 0 },
//         threeYearExpectedReturn: { type: Number, default: 0 },
//         returns: {
//             ytd: { type: Number, default: 0 },
//             oneYear: { type: Number, default: 0 },
//             threeYear: { type: Number, default: 0 },
//             fiveYear: { type: Number, default: 0 },
//             tenYear: { type: Number, default: 0 },
//         },
//         },
//     },
//     sectorWeights: [
//         {
//         name: { type: String, default: '' },
//         equityPercent: { type: Number, default: 0 },
//         relativeToCategory: { type: Number, default: 0 },
//         },
//     ],
//     worldRegions: [
//         {
//         name: { type: String, default: '' },
//         equityPercent: { type: Number, default: 0 },
//         relativeToCategory: { type: Number, default: 0 },
//         },
//     ],
//     }, 
//     { timestamps: true }
// );

// // Indexing for faster queries
// metadata.index({ symbol: 1 });

// const Metadata = mongoose.model('Metadata', metadata, 'metadata');

// export default Metadata


// Main Schema for the data
// const metadata = new Schema({
//     symbol: { type: String, required: true },
//     source: { type: String, required: true },
//     ticker: { type: String, required: true },
//     code: { type: String, required: true },
//     type: { type: String, required: true },
//     name: { type: String, required: true },
//     exchange: { type: String, required: true },
//     currency: { type: String, required: true },
//     countryName: { type: String, required: true },
//     countryIso: { type: String, required: true },
//     sector: { type: String, default: "" },
//     industry: { type: String, default: "" },
//     description: { type: String, default: "NA" },
//     isin: { type: String, default: "" },
//     primaryTicker: { type: String, default: "" },
//     fullTimeEmployees: { type: Number, default: 0 },
//     updatedAt: { type: Date, required: true },
//     cusip: { type: String, default: "" },
//     logoURL: { type: String, default: "" },
//     cik: { type: String, default: "" },
//     employerIdNumber: { type: String, default: "" },
//     fiscalYearEnd: { type: String, default: "" },
//     ipoDate: { type: Date, default: new Date("0001-01-01") },
//     validUntil: { type: Date, required: true },
//     internationalDomestic: { type: String, default: "" },
//     gicSector: { type: String, default: "" },
//     gicGroup: { type: String, default: "" },
//     gicIndustry: { type: String, default: "" },
//     gicSubIndustry: { type: String, default: "" },
//     addressDetails: { type: Schema.Types.Mixed, default: null },
//     phone: { type: String, default: "" },
//     webUrl: { type: String, default: "" },
//     category: { type: String, default: "" },
//     fundSummary: { type: String, default: "" },
//     fundFamily: { type: String, default: "" },
//     fundFiscalYearEnd: { type: String, default: "" },
//     officers: [Schema.Types.Mixed],
//     exchangeMarket: { type: String, default: "" },
//     fundCategory: { type: String, default: "" },
//     fundStyle: { type: String, default: "" },
//     homeCategory: { type: String, default: "" },
//     isDelisted: { type: Boolean, default: false },
//     listings: [Schema.Types.Mixed],
//     marketCapitalization: {
//         value: { type: Number, default: 0 },
//         dominance: { type: Number, default: 0 },
//         diluted: { type: Number, default: 0 },
//         average: { type: Number, default: 0 },
//         bucket: [
//             {
//                 category: { type: String, default: "" },
//                 size: { type: String, required: true },
//                 categoryAverage: { type: Number, default: 0 },
//                 benchmark: { type: Number, default: 0 },
//                 portfolioPercent: { type: Number, default: 0 },
//                 value: { type: Number, default: 0 }
//             }
//         ]
//     },
//     statistics: { type: Schema.Types.Mixed, default: null },
//     highlights: { type: Schema.Types.Mixed, default: null },
//     technicals: {
//         beta: { type: Number, default: 0 },
//         "52WeekHigh": { type: Number, default: 0 },
//         "52WeekLow": { type: Number, default: 0 },
//         "50DayMA": { type: Number, default: 0 },
//         "200DayMA": { type: Number, default: 0 },
//         sharesShort: { type: Number, default: 0 },
//         sharesShortPriorMonth: { type: Number, default: 0 },
//         shortRatio: { type: Number, default: 0 },
//         shortPercent: { type: Number, default: 0 }
//     },
//     valuation: { type: Schema.Types.Mixed, default: null },
//     sharesStatistics: { type: Schema.Types.Mixed, default: null },
//     analystRatings: [Schema.Types.Mixed],
//     splitsDividends: { type: Schema.Types.Mixed, default: null },
//     dividends: [Schema.Types.Mixed],
//     splits: [Schema.Types.Mixed],
//     earnings: { type: Schema.Types.Mixed, default: null },
//     financials: { type: Schema.Types.Mixed, default: null },
//     insiderTransactions: [Schema.Types.Mixed],
//     holders: { type: Schema.Types.Mixed, default: null },
//     outstandingShares: { type: Schema.Types.Mixed, default: null },
//     indexComponents: [Schema.Types.Mixed],
//     exchangeTradedFundDetails: {
//         domicile: { type: String,  default: "" },
//         yield: { type: Number, default: 0 },
//         companyName: { type: String,  default: "" },
//         companyURL: { type: String, default: "" },
//         etfUrl: { type: String, default: "" },
//         indexName: { type: String, default: "" },
//         dividendPayingFrequency: { type: String, default: "" },
//         maxAnnualManagementCharge: { type: String, default: "0.00" },
//         ongoingCharge: { type: Number, default: 0.0 },
//         dateOngoingCharge: { type: Date},
//         netExpenseRatio: { type: Number, default: 0.0 },
//         annualHoldingsTurnover: { type: String, default: "0.00000" },
//         totalAssets: { type: Number, default: 0.0 },
//         holdingsCount: { type: Number, default: 0 },
//         performance: {
//             "1YVolatility": { type: Number, default: 0 },
//             "3YVolatility": { type: Number, default: 0 },
//             "3YExpReturn": { type: Number, default: 0 },
//             "3YSharpRatio": { type: Number, default: 0 },
//             returnsYtd: { type: Number, default: 0 },
//             returns1Y: { type: Number, default: 0 },
//             returns3Y: { type: Number, default: 0 },
//             returns5Y: { type: Number, default: 0 },
//             returns10Y: { type: Number, default: 0 }
//         },
//         fixedIncome: [{
//             name: { type: String, required: true },
//             fundPercent: { type: Number, default: 0 },
//             relativeToCategory: { type: Number, default: 0 }
//         }],
//         inceptionDate: { type: Date},
//         morningStar: {
//             ratio: { type: Number, default: 0 },
//             categoryBenchmark: { type: String, default: "-" },
//             sustainabilityRatio: { type: Number, default: 0 }
//         },
//         assetAllocation: [{
//             name: { type: String, required: true },
//             category: { type: String, default: "" },
//             longPercent: { type: Number, default: 0 },
//             shortPercent: { type: Number, default: 0 },
//             netAssetsPercent: { type: Number, default: 0 }
//         }],
//         valuationsGrowth: {
//             growthRatesPortfolio: {
//             salesGrowth: { type: Number, default: 0 },
//             cashFlowGrowth: { type: Number, default: 0 },
//             bookValueGrowth: { type: Number, default: 0 },
//             historicalEarningsGrowth: { type: Number, default: 0 },
//             longTermProjectedEarningsGrowth: { type: Number, default: 0 }
//         },
//         growthRatesToCategory: {
//             salesGrowth: { type: Number, default: 0 },
//             cashFlowGrowth: { type: Number, default: 0 },
//             bookValueGrowth: { type: Number, default: 0 },
//             historicalEarningsGrowth: { type: Number, default: 0 },
//             longTermProjectedEarningsGrowth: { type: Number, default: 0 }
//         },
//         valuationsRatesPortfolio: {
//             priceBook: { type: Number, default: 0 },
//             priceSales: { type: Number, default: 0 },
//             priceCashFlow: { type: Number, default: 0 },
//             dividendYieldFactor: { type: Number, default: 0 },
//             priceProspectiveEarnings: { type: Number, default: 0 }
//         },
//         valuationsRatesToCategory: {
//             priceBook: { type: Number, default: 0 },
//             priceSales: { type: Number, default: 0 },
//             priceCashFlow: { type: Number, default: 0 },
//             dividendYieldFactor: { type: Number, default: 0 },
//             priceProspectiveEarnings: { type: Number, default: 0 }
//         }},
//         sectorWeights: [{
//             name: { type: String, required: true },
//             category: { type: String, default: "" },
//             equityPercent: { type: Number, default: 0 },
//             relativeToCategory: { type: Number, default: 0 }
//         }],
//         worldRegions: [{
//             name: { type: String, required: true },
//             category: { type: String, default: "" },
//             equityPercent: { type: Number, default: 0 },
//             relativeToCategory: { type: Number, default: 0 }
//         }],
//         top10Holdings: [Schema.Types.Mixed],
//         holdings: [Schema.Types.Mixed]
//     },
//     mutualFundDetails: { type: Schema.Types.Mixed, default: null }
// });
const metadata = new Schema({
    symbol: { type: String, unique: true, ref: 'Exchange', required: true },
    source: { type: String, required: true },
    ticker: { type: String, required: true },
    code: { type: String, default: "" },
    type: { type: String, required: true },
    name: { type: String, default: "" },
    exchange: { type: String, default: "" },
    currency: { type: String, required: true },
    countryName: { type: String, default: "" },
    countryIso: { type: String, default: "" },
    sector: { type: String, default: "" },
    industry: { type: String, default: "" },
    description: { type: String, default: "NA" },
    isin: { type: String, default: "" },
    primaryTicker: { type: String, default: "" },
    fullTimeEmployees: { type: Number, default: 0 },
    updatedAt: { type: Date },
    cusip: { type: String, default: "" },
    logoURL: { type: String, default: "" },
    cik: { type: String, default: "" },
    employerIdNumber: { type: String, default: "" },
    fiscalYearEnd: { type: String, default: "" },
    ipoDate: { type: Date },
    validUntil: { type: Date, required: true },
    internationalDomestic: { type: String, default: "" },
    gicSector: { type: String, default: "" },
    gicGroup: { type: String, default: "" },
    gicIndustry: { type: String, default: "" },
    gicSubIndustry: { type: String, default: "" },
    addressDetails: { type: Schema.Types.Mixed, default: null },
    phone: { type: String, default: "" },
    webUrl: { type: String, default: "" },
    category: { type: String, default: "" },
    fundSummary: { type: String, default: "" },
    fundFamily: { type: String, default: "" },
    fundFiscalYearEnd: { type: String, default: "" },
    officers: [Schema.Types.Mixed],
    exchangeMarket: { type: String, default: "" },
    fundCategory: { type: String, default: "" },
    fundStyle: { type: String, default: "" },
    homeCategory: { type: String, default: "" },
    isDelisted: { type: Boolean, default: false },
    listings: [Schema.Types.Mixed],
    marketCapitalization: {
        value: { type: Number, default: 0 },
        dominance: { type: Number, default: 0 },
        diluted: { type: Number, default: 0 },
        average: { type: Number, default: 0 },
        bucket: [
            {type: Schema.Types.Mixed, default: null}
        ]
    },
    statistics: { type: Schema.Types.Mixed, default: null },
    highlights: { type: Schema.Types.Mixed, default: null },
    technicals: {
        type: Schema.Types.Mixed, default: null
    },
    valuation: { type: Schema.Types.Mixed, default: null },
    sharesStatistics: { type: Schema.Types.Mixed, default: null },
    analystRatings: [Schema.Types.Mixed],
    splitsDividends: { type: Schema.Types.Mixed, default: null },
    dividends: [Schema.Types.Mixed],
    splits: [Schema.Types.Mixed],
    earnings: { type: Schema.Types.Mixed, default: null },
    financials: { type: Schema.Types.Mixed, default: null },
    insiderTransactions: [Schema.Types.Mixed],
    holders: { type: Schema.Types.Mixed, default: null },
    outstandingShares: { type: Schema.Types.Mixed, default: null },
    indexComponents: [Schema.Types.Mixed],
    exchangeTradedFundDetails: {
        type: Schema.Types.Mixed, default: null
    },
    mutualFundDetails: { type: Schema.Types.Mixed, default: null }
});


metadata.index({ symbol: 1 });

const Metadata = mongoose.model('Metadata', metadata, 'metadata');

export default Metadata
