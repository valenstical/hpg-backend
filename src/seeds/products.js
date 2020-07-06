import '@babel/polyfill';

import models from '../database/models';

const cheerio = require('cheerio');
const fs = require('fs');

const html = fs.readFileSync('./src/seeds/usa.html');
const $ = cheerio.load(html);
const result = [];

const { Product } = models;

const create = async (data) => {
  try {
    const { code } = data;
    delete data.code;

    if (!Number.isInteger(+data.carton_units)) { delete data.carton_units; }
    await Product.update(data, { where: { code } });
  } catch (error) {
    console.error(error);
  }
};

$('tr').each(async function (row) {
  const data = {};

  data.code = $(this).find('td:nth-child(1) p').html();
  if ((Number.isInteger(+data.code) && !!data.code && data.code.length === 3)) {
    data.title = String($(this).find('td:nth-child(2) p').html()).replace(/<nobr>/ig, '')
      .replace(/<\/nobr>/ig, '')
      .replace(/&#xA0/ig, '');
    data.carton_units = $(this).find('td:nth-child(7) p').html();
    data.cc = $(this).find('td:nth-child(6) p').html();

    await create(data);
    // result.push($(this).html());
  }
});

fs.writeFileSync('./src/seeds/path.html', result.join('\n'));
