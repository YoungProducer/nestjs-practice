export interface RefreshTokenCreateOutputInterface {
    /**
     * Just token value;
     */
    dbTokenValue: string;
    /**
     * Contain token value and token id in db;
     */
    tokenForRespond: string;
}
