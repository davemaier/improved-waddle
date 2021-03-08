import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";

export default withApiAuthRequired(async function graphql(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);

    console.log(accessToken);

    const result = await axios({
      method: "post",
      url: process.env.GRAPHQL_ENDPOINT,
      headers: { 
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json' },
      data: req.body,
    });

    return res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ error });
  }
});
