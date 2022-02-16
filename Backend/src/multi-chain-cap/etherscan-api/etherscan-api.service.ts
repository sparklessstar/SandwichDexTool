import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EtherscanApiService {
    private url = process.env.ETHERSCAN_URL;
    private apiKey = process.env.ETHERSCAN_APIKEY;

    constructor(
        private httpService: HttpService
    ){}

    async getTopTokens(){
        const html = await this.fetchTopTokens();
        return html;
    }
  
  
    private async fetchTopTokens(): Promise<any> {
      console.log('fetch-top-tokens');
      let request;
      
      request = await this.httpService
          .get('https://etherscan.io/tokens', {
          params: { 
              p:1,
          },
          })
          .toPromise();
      return request.data;
              
    }

    async searchTokens(searchText:String){
      const response = await this.searchTokensFromScan(searchText);
      return response;
    }

    private async searchTokensFromScan(searchText:String): Promise<any> {

      console.log('Etherscan Search');
      let request;
      
      request = await this.httpService
          .get('https://etherscan.io/searchHandler', {
          params: { 
              term:searchText,
              filterby:0
          },
          })
          .toPromise();
      return request.data;

    }
}
