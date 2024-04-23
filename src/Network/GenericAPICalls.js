export const handleGetAPICall = async (urlVal, queryParams = {}, headers = {}) => {
    try {
      const url = new URL(urlVal);
      url.search = new URLSearchParams(queryParams).toString();
  
      const fetchOptions = {
        headers: headers || {},
      };
  
      const resp = await fetch(url, fetchOptions);
      const dataObj = await resp.json();
  
      return dataObj;
    } catch (e) {
      console.error("Error while fetching Get data: ", e);
    }
  };
  
  export const handlePostAPICall = async (urlVal, queryParams, headers, body) => {
    try {
      const url = new URL(urlVal);
      url.search = new URLSearchParams(queryParams).toString();
  
      const fetchOptions = {
        method: "POST",
        headers: headers || {},
        body: JSON.stringify(body),
      };
  
      const resp = await fetch(url, fetchOptions);
      const dataObj = await resp.json();
  
      return dataObj;
    } catch (e) {
      console.error("Error while fetching POST data: ", e);
    }
  };
  