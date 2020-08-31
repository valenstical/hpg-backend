import axios from 'axios';

export const fetchCC = async (user) => {
  try {
    const { data } = await axios.get(`https://apigw.foreverliving.com/api/reporttdm/V2/distributors/${user.fbo_id}/treeview-cc?countryCode=${user.country_code}`,
      {
        headers: {
          Authorization: process.env.FLP_360_TOKEN
        }
      });
    const activeCC = data[0].monthlyCCValues[0].totalActiveCCMTD; // personalCCMTD
    const isActive = activeCC >= 4;
    return { activeCC, isActive };
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchLevel = async (fbo_id, country_code) => {
  try {
    const { data } = await axios.get(`https://apigw.foreverliving.com/api/reporttdm/V2/downlineSearch/fboId/234000087844/country/${country_code}/searchTerm/${fbo_id}`,
      {
        headers: {
          Authorization: process.env.FLP_360_TOKEN
        }
      });
    const { frontline } = data;
    const result = {};
    if (frontline.length) {
      const uplines = frontline[0].uplineDistributors;
      result.level = frontline[0].memberLevel;
      result.sponsor_id = uplines.substring(0, uplines.lastIndexOf(',')).split(',').pop();
    }
    return result;
  } catch (error) {
    return null;
  }
};
