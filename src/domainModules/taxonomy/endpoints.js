import { buildEndpointSpec } from 'coreModules/api/endpointSpecFactory'
import { createDeleter, createSetter } from 'utilities/stateHelper'

const setScientificName = createSetter(['attributes', 'scientificName'])
const deleteScientificUnderscoreName = createDeleter([
  'attributes',
  'scientific_name',
])

export const TAXONOMY_SEARCH = buildEndpointSpec({
  mapResponse: json => {
    const parsedResult = {
      ...json,
      data:
        json.data &&
        json.data.map(item => {
          return deleteScientificUnderscoreName(
            setScientificName(item, item.attributes.scientific_name)
          )
        }),
    }

    return parsedResult
  },
  mock: () => {
    /* eslint-disable sort-keys */
    return {
      data: [
        {
          type: 'taxon',
          id: '10400032',
          attributes: {
            rubin_number: '203303',
            higherTaxa: {
              order: 'Didelphimorphia',
              suborder: '',
              infraorder: '',
              superfamily: '',
              family: 'Didelphidae',
              subfamily: 'Didelphinae',
              tribe: '',
              genus: 'Chironectes',
              subgenus: '',
            },
            rank: 'species',
            scientific_name: 'Chironectes minimus',
            author: '(Zimmermann)',
            author_date: '1780',
            valid_name: true,
            verncular_names: { en: ['Water Opossum'] },
            synonyms:
              '<i>cayennensis</i>  Turton, 1800; <i>guianensis</i> Kerr, 1792; <i>gujanensis</i> Link, 1795; <i>palmata</i> Daudin <i>in</i> Lac\u00e9p\u00e8de, 1802; <i>paraguensis</i> Kerr, 1792; <i>sarcovienna</i> Shaw, 1800; <i>variegatus</i> Olfers, 1818; <i>yapock</i> Desmarest, 1820<b><i>; argyrodytes</i></b> Dickey, 1928; <b><i>langsdorffi</i></b> Boitard, 1845; <i>bresslaui</i> Pohle, 1927; <b><i>panamensis</i></b> Goldman, 1914.',
            sort_order: '04-00032',
          },
        },
        {
          type: 'taxon',
          id: '10400056',
          attributes: {
            rubin_number: null,
            higherTaxa: {
              order: 'Didelphimorphia',
              suborder: '',
              infraorder: '',
              superfamily: '',
              family: 'Didelphidae',
              subfamily: 'Didelphinae',
              tribe: '',
              genus: 'Gracilinanus',
              subgenus: '',
            },
            rank: 'species',
            scientific_name: 'Gracilinanus formosus',
            author: 'Shamel',
            author_date: '1930',
            valid_name: true,
            verncular_names: { en: ['Pygmy Opossum'] },
            synonyms: '<i>Marmosa muscula</i>  Shamel, 1930 [preoccupied].',
            sort_order: '04-00056',
          },
        },
        {
          type: 'taxon',
          id: '10400077',
          attributes: {
            rubin_number: '200336',
            higherTaxa: {
              order: 'Didelphimorphia',
              suborder: '',
              infraorder: '',
              superfamily: '',
              family: 'Didelphidae',
              subfamily: 'Didelphinae',
              tribe: '',
              genus: 'Marmosa',
              subgenus: '',
            },
            rank: 'species',
            scientific_name: 'Marmosa murina',
            author: 'Linnaeus',
            author_date: '1758',
            valid_name: true,
            verncular_names: { en: ['Linnaeus\u2019s Mouse Opossum'] },
            synonyms:
              '<i>bombascarae</i>  Anthony, 1922; <i>chloe</i> Thomas, 1907; <i>dorsigera</i> (Linnaeus, 1758); <i>duidae</i> Tate, 1931; <i>guianensis</i> (Kerr, 1792); <i>klagesi</i> J. A. Allen, 1900; <i>macrotarsus</i> (Wagner, 1842); <i>madeirensis</i> Cabrera, 1913; <i>maranii</i> Thomas, 1924; <i>meridionalis</i> Miranda-Ribeiro, 1936; <i>moreirae</i> Miranda-Ribeiro, 1936; <i>muscula</i> (Cabanis, 1848); <i>parata</i> Thomas, 1911; <i>roraimae</i> Tate, 1931; <i>tobagi</i> Thomas, 1911; <i>waterhousii<',
            sort_order: '04-00077',
          },
        },
        {
          type: 'taxon',
          id: '10400078',
          attributes: {
            rubin_number: null,
            higherTaxa: {
              order: 'Didelphimorphia',
              suborder: '',
              infraorder: '',
              superfamily: '',
              family: 'Didelphidae',
              subfamily: 'Didelphinae',
              tribe: '',
              genus: 'Marmosa',
              subgenus: '',
            },
            rank: 'species',
            scientific_name: 'Marmosa quichua',
            author: 'Thomas',
            author_date: '1899',
            valid_name: true,
            verncular_names: { en: ['Quechuan Mouse Opossum'] },
            synonyms: '<i>musicola</i>  Osgood, 1913.',
            sort_order: '04-00078',
          },
        },
        {
          type: 'taxon',
          id: '10800060',
          attributes: {
            rubin_number: null,
            higherTaxa: {
              order: 'Dasyuromorphia',
              suborder: '',
              infraorder: '',
              superfamily: '',
              family: 'Dasyuridae',
              subfamily: 'Dasyurinae',
              tribe: 'Phascogalini',
              genus: 'Antechinus',
              subgenus: '',
            },
            rank: 'species',
            scientific_name: 'Antechinus minimus',
            author: '\u00c9. Geoffroy',
            author_date: '1803',
            valid_name: true,
            verncular_names: { en: ['Swamp Antechinus'] },
            synonyms:
              '<i>affinis</i> (Gray, 1841);<i> concinnus </i>Higgins and Petterd, 1884;<i> maritima</i> (Finlayson, 1958);<i> rolandensis </i>Higgins and Petterd, 1883.',
            sort_order: '08-00060',
          },
        },
        {
          type: 'taxon',
          id: '10800117',
          attributes: {
            rubin_number: null,
            higherTaxa: {
              order: 'Dasyuromorphia',
              suborder: '',
              infraorder: '',
              superfamily: '',
              family: 'Dasyuridae',
              subfamily: 'Sminthopsinae',
              tribe: 'Planigalini',
              genus: 'Planigale',
              subgenus: '',
            },
            rank: 'species',
            scientific_name: 'Planigale maculata',
            author: 'Gould',
            author_date: '1851',
            valid_name: true,
            verncular_names: { en: ['Pygmy Planigale'] },
            synonyms:
              '<i>minutissimus<b> </b></i> (Gould, 1852);<b><i> sinualis</i></b> (Thomas, 1926).',
            sort_order: '08-00117',
          },
        },
        {
          type: 'taxon',
          id: '10900026',
          attributes: {
            rubin_number: '450912',
            higherTaxa: {
              order: 'Peramelemorphia',
              suborder: '',
              infraorder: '',
              superfamily: '',
              family: 'Peramelidae',
              subfamily: 'Peramelinae',
              tribe: '',
              genus: 'Perameles',
              subgenus: '',
            },
            rank: 'species',
            scientific_name: 'Perameles nasuta',
            author: '\u00c9. Geoffroy',
            author_date: '1804',
            valid_name: true,
            verncular_names: { en: ['Long-nosed Bandicoot'] },
            synonyms:
              '<i>lawson</i> Quoy and Gaimard, 1824;<i> major </i>Schinz, 1825;<i> musei </i>(Boitard, 1841);<i> pallescens</i> Thomas, 1923.',
            sort_order: '09-00026',
          },
        },
        {
          type: 'taxon',
          id: '11000035',
          attributes: {
            rubin_number: '551203',
            higherTaxa: {
              order: 'Diprotodontia',
              suborder: 'Phalangeriformes',
              infraorder: '',
              superfamily: 'Phalangeroidea',
              family: 'Phalangeridae',
              subfamily: 'Ailuropinae',
              tribe: '',
              genus: 'Ailurops',
              subgenus: '',
            },
            rank: 'species',
            scientific_name: 'Ailurops ursinus',
            author: 'Temminck',
            author_date: '1824',
            valid_name: true,
            verncular_names: { en: ['Sulawesi Bear Cuscus'] },
            synonyms:
              '<b><i>flavissimus</i> </b>(Feiler, 1977);<b><i> furvus </i></b>(Miller and Hollister, 1922); <i>intermedius</i> (Hooijer, 1952);<b><i> togianus</i></b> (Tate, 1945).',
            sort_order: '10-00035',
          },
        },
        {
          type: 'taxon',
          id: '11000098',
          attributes: {
            rubin_number: '652103',
            higherTaxa: {
              order: 'Diprotodontia',
              suborder: 'Phalangeriformes',
              infraorder: '',
              superfamily: 'Petauroidea',
              family: 'Pseudocheiridae',
              subfamily: 'Hemibelideinae',
              tribe: '',
              genus: 'Petauroides',
              subgenus: '',
            },
            rank: 'species',
            scientific_name: 'Petauroides volans',
            author: 'Kerr',
            author_date: '1792',
            valid_name: true,
            verncular_names: { en: ['Greater Glider'] },
            synonyms:
              '<i>didelphoides</i> (G. Cuvier, 1825);<i> incanus </i>Thomas, 1923;<i> macroura </i>(Shaw, 1794);<i> maximus<b> </b></i>(Partington, 1837);<i> peronii </i>(Desmarest, 1818);<i> taguanoides </i>(Desmarest, 1818);<i> voluccella </i>(F. Meyer, 1793);<b><i> minor</i></b> (Collett, 1887); <i>cinereus </i>Ramsay, 1890;<i> armillatus </i>Thomas, 1923.',
            sort_order: '10-00098',
          },
        },
        {
          type: 'taxon',
          id: '11000175',
          attributes: {
            rubin_number: '680303',
            higherTaxa: {
              order: 'Diprotodontia',
              suborder: 'Macropodiformes',
              infraorder: '',
              superfamily: '',
              family: 'Hypsiprymnodontidae',
              subfamily: '',
              tribe: '',
              genus: 'Hypsiprymnodon',
              subgenus: '',
            },
            rank: 'species',
            scientific_name: 'Hypsiprymnodon moschatus',
            author: 'Ramsay',
            author_date: '1876',
            valid_name: true,
            verncular_names: { en: ['Musky Rat-kangaroo'] },
            synonyms: '<i>nudicaudatus</i>  (Owen, 1877).',
            sort_order: '10-00175',
          },
        },
      ],
      jsonapi: { version: '1.0' },
      meta: {
        source: 'Mammal Species of the World',
        number_of_records_returned: 10,
      },
    }
    /* eslint-enable sort-keys */
  },
  operationId: 'getTaxaByName',
  pathname: '/taxon',
})
