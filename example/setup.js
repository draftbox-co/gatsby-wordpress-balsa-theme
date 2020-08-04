(async () => {
  const wpConfig = require('./.wordpress-config.json');
  const siteConfig = require('./site-config');
  const fetch = require('node-fetch');
  const fs = require('fs');
  const path = require('path');
  const FormData = require('form-data');

  console.log(wpConfig);
  if (Object.keys(wpConfig).length) {
    let siteData = {};
    let token = '';
    if (wpConfig.hostingWPCOM) {
      const apiUrl = 'https://public-api.wordpress.com/oauth2/token';
      try {
        console.log(JSON.stringify({
          client_id: wpConfig.auth.wpcom_app_clientId,
          client_secret: wpConfig.auth.wpcom_app_clientSecret,
          username: wpConfig.auth.wpcom_user,
          password: wpConfig.auth.wpcom_pass,
          grant_type: 'password'
        }));
        const formData = new FormData();
        formData.append('client_id', wpConfig.auth.wpcom_app_clientId);
        formData.append('client_secret', wpConfig.auth.wpcom_app_clientSecret);
        formData.append('username', wpConfig.auth.wpcom_user);
        formData.append('password', wpConfig.auth.wpcom_pass);
        formData.append('grant_type', 'password');
        console.log(formData);
        const resp = await fetch(apiUrl, {
          method: 'POST',
          body: formData
        });
        console.log(resp.status);
        if (resp.status === 200) {
          const res = await resp.json();
          console.log('final json', res);
          token = res.access_token;
          const apiUrlToken = `https://public-api.wordpress.com/wp/v2/sites/${wpConfig.baseUrl}/settings`;
          console.log(apiUrlToken , token);
          const respToken = await fetch(apiUrlToken, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          });
          console.log(respToken.status);
          if (respToken.status === 200) {
            const finalRes = await respToken.json();
            siteData = finalRes;
          }
        }
      } catch (err) {
        console.log('error while fetching wordpress auth token', err);
      }
    } else {
      try {
        const apiUrl = `https://${wpConfig.baseUrl}/wp-json`;
        console.log('api - url', apiUrl);
        const resp = await fetch(apiUrl);
        console.log(resp.status);
        if (resp.status === 200) {
          const finalRes = await resp.json()
          siteData = finalRes;
        }
      } catch (err) {
        console.log('error while fetching wordpress self hosted', err);
      }
    }
    console.log('ssiiitteedaaattaa', siteData);
    const masterConfig = {"subscribeWidget":{"title":"","helpText":"","successMessage":""},"footer":{"copyright":"","navigation":[{"label":"","url":""}]},"header":{"navigation":[{"label":"","url":""}]},"socialLinks":{"twitter":"","facebook":"","instagram":"","linkedin":"","github":""},"contactWidget":{"title":"","successMessage":""},"identity":{"siteTitle":"","siteDescription":"","language":"en","postsPerPage":10,"logoUrl":"","iconUrl":"","coverUrl":"","alternateLogoUrl":""},"metadata":{"title":"","description":""},"twitterCard":{"title":"","description":"","imageUrl":"","username":""},"facebookCard":{"title":"","description":"","imageUrl":"","appId":"","width":1000,"height":523}}
    const newSiteConfig = Object.assign({}, masterConfig);
    if (siteData && siteData.name) {
      newSiteConfig.subscribeWidget.title = `Subscribe to ${siteData.name}`;
      newSiteConfig.subscribeWidget.successMessage = `Thanks for subscribing to ${siteData.name}.`;
      newSiteConfig.subscribeWidget.helpText = 'Get the latest posts delivered right to your inbox.';
      newSiteConfig.footer.copyright = siteData.name;
      newSiteConfig.contactWidget.title = `Contact ${siteData.name}`;
      newSiteConfig.contactWidget.successMessage = `We'll get in touch with you soon.`;
      newSiteConfig.identity.siteTitle = siteData.name;
      newSiteConfig.identity.siteDescription = siteData.description || '';
      newSiteConfig.metadata.title = siteData.name;
      newSiteConfig.metadata.description = siteData.description || '';
      newSiteConfig.twitterCard.title = siteData.name;
      newSiteConfig.twitterCard.description = siteData.description || '';
      newSiteConfig.facebookCard.title = siteData.name;
      newSiteConfig.facebookCard.description = siteData.description || '';
    }
    if (siteData && siteData.title) {
      newSiteConfig.subscribeWidget.title = `Subscribe to ${siteData.title}`;
      newSiteConfig.subscribeWidget.successMessage = `Thanks for subscribing to ${siteData.title}.`;
      newSiteConfig.subscribeWidget.helpText = 'Get the latest posts delivered right to your inbox.';
      newSiteConfig.footer.copyright = siteData.title;
      newSiteConfig.contactWidget.title = `Contact ${siteData.title}`;
      newSiteConfig.contactWidget.successMessage = `We'll get in touch with you soon.`;
      newSiteConfig.identity.siteTitle = siteData.title;
      newSiteConfig.identity.siteDescription = siteData.description || '';
      newSiteConfig.metadata.title = siteData.title;
      newSiteConfig.metadata.description = siteData.description || '';
      newSiteConfig.twitterCard.title = siteData.title;
      newSiteConfig.twitterCard.description = siteData.description || '';
      newSiteConfig.facebookCard.title = siteData.title;
      newSiteConfig.facebookCard.description = siteData.description || '';
    }

    const finalConfig = Object.assign({}, siteConfig, {
      metadata: newSiteConfig.metadata,
      twitterCard: newSiteConfig.twitterCard,
      facebookCard: newSiteConfig.facebookCard
    }, newSiteConfig.identity);
    fs.writeFileSync(path.join(__dirname, 'site-config-new.js'), `module.exports = ${JSON.stringify(finalConfig, null, 2)}`);
    console.log('done');
  } else {
    console.error('cant process empty config');
  }
})();