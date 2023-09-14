const axios = require('axios');
const { baseUrl, size, marketplaceUrl, clase, p } = require('../config');
const { WEI } = require('../constants');
const convertWeiToEth = (price) => (parseFloat(price) / WEI);
var claseAxie = clase.reptile;
var partArray = new Array(p.grassSnake, p.garishWorm, p.cerastes, p.toothlessBite);


const getList = async () => {
    try {
        // const { from, size, sort, auctionType, Sale, criteria: { "region": null, "parts": null, "bodyShapes": null, "classes": null, "stages": null, "numMystic": null, "pureness": null, "title": null, "breedable": null, "breedCount": null, "hp": [], "skill": [], "speed": [], "morale": [] } } = req.query;
        const response = await axios.post(`${baseUrl}/graphql-server-v2/graphql`, {
            "query": `query GetAxieBriefList(
                $auctionType: AuctionType, 
                $criteria: AxieSearchCriteria, 
                $from: Int, $sort: SortBy, 
                $size: Int, $owner: String) {  
                axies(
                    auctionType: $auctionType, 
                    criteria: $criteria, 
                    from: $from, 
                    sort: $sort, 
                    size: $size, 
                    owner: $owner
                    ) {
                        total    
                        results {      
                            ...AxieBrief      
                        }    
                }
      }
        fragment AxieBrief on Axie {  
          id  
          name  
          stage
          image  
          class  
          breedCount    
        auction {    
              currentPrice    
              currentPriceUSD
              seller    
              listingIndex
              state
        }  
      }`,
            "variables": {
                "from": 0,
                "size": size,
                "sort": "Latest",
                "auctionType": null,
                "owner": null,
                "criteria": {
                    "region": null,
                    "parts":  partArray,
                    "bodyShapes": null,
                    "classes": claseAxie,
                    "stages": null,
                    "numMystic": null,
                    "pureness": null,
                    "title": null,
                    "breedable": null,
                    "breedCount": null,
                    "hp": [],
                    "skill": [],
                    "speed": [38],
                    "morale": []
                }
            }
        });
        
        if (response.data.data.axies.results) {
            const resp = response.data.data.axies.results;

            return resp.map(item => ({
                id: item.id,
                name: item.name,
                stage: item.stage,
                image: item.image,
                url: `${marketplaceUrl}${item.id}`,
                class: item.class,
                breedCount: item.breedCount,
                priceUSD: item.auction.currentPriceUSD,
                priceETH: convertWeiToEth(item.auction.currentPrice).toString(),
                auction: {
                    ...item.auction
                }
                
            }));
            
        }
      
        return [];
    } catch (error) {
    
        return []
    }
};





// maxUSD
const filterUSD = (list, notifiedList) => {
    const cap = parseFloat(maxUSD);
    const result = list.filter(item => {
        return parseFloat(item.priceUSD) <= cap && !notifiedList.includes(item.id);
    })
    return result;
};

//maxETH
const filterETH = (list, notifiedList) => {
    const cap = parseFloat(maxETH);
    const result = list.filter(item => {
        return parseFloat(item.priceETH) <= cap && !notifiedList.includes(item.id);
    })
    return result;
};



module.exports = {  getList, filterUSD, filterETH, convertWeiToEth };

