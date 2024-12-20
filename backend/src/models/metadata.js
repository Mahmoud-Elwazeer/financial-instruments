import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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


const Metadata = mongoose.model('Metadata', metadata, 'metadata');

export default Metadata
