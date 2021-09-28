/**
 * @format
 */

import 'react-native';
import React from 'react';
import NewsList from '../src/Modules/NewsModule/Components/NewsList/NewsList';
import {render} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import useNewsQuery from 'src/Modules/NewsModule/Hooks/useNewsQuery';
import useKeywordsValue from 'src/Modules/NewsModule/Hooks/useKeywordsValue';
import useLocationValue from 'src/Modules/NewsModule/Hooks/useLocationValue';

jest.mock('react-native-snackbar', () => 'Snackbar');
jest.mock('@react-native-async-storage/async-storage', () => 'AsyncStorage');
jest.mock('src/Modules/NewsModule/Hooks/useNewsQuery', () => jest.fn());
jest.mock('src/Modules/NewsModule/Hooks/useLocationValue', () => jest.fn());
jest.mock('src/Modules/NewsModule/Hooks/useKeywordsValue', () => jest.fn());

describe('NewsList', () => {
  beforeEach(() => {
    (useNewsQuery as jest.Mock<any>).mockImplementation(() => ({
      results: [],
      isLoading: false,
      newsResponse: {},
      locationFilters: [],
      keywordFilters: [],
    }));
  });
  it('renders correctly', () => {
    renderer.create(<NewsList />);
  });

  it('renders loading', () => {
    (useNewsQuery as jest.Mock<any>).mockImplementation(() => ({
      results: [],
      isLoading: true,
      newsResponse: {},
      locationFilters: [],
      keywordFilters: [],
    }));
    const {getByTestId} = render(<NewsList />);
    const FlatList = getByTestId('newsList');

    expect(FlatList.props.refreshing).toBeTruthy();
  });

  it('renders empty state', () => {
    (useNewsQuery as jest.Mock<any>).mockImplementation(() => ({
      results: [],
      isLoading: false,
      newsResponse: {},
      locationFilters: [],
      keywordFilters: [],
    }));
    const {getByText} = render(<NewsList />);

    expect(getByText('No Data Found')).toBeTruthy();
  });

  it('renders data', () => {
    (useNewsQuery as jest.Mock<any>).mockImplementation(() => ({
      results: SAMPLE_DATA,
      error: {response: {}},
      isLoading: false,
      newsResponse: {},
      locationFilters: [],
      keywordFilters: [],
    }));
    (useKeywordsValue as jest.Mock<string>).mockImplementation(() => '');
    (useLocationValue as jest.Mock<string>).mockImplementation(() => '');

    const {getByTestId} = render(<NewsList />);
    const FlatList = getByTestId('newsList');

    expect(FlatList.props.data.length > 0).toBeTruthy();
  });

  it('renders filtered data', () => {
    (useNewsQuery as jest.Mock<any>).mockImplementation(() => ({
      results: SAMPLE_DATA,
      error: {response: {}},
      isLoading: false,
      newsResponse: {},
      locationFilters: locationFilters,
      keywordFilters: keywordFilters,
    }));
    (useKeywordsValue as jest.Mock<string>).mockImplementation(
      () => 'The Inheritance (Play)',
    );
    (useLocationValue as jest.Mock<string>).mockImplementation(() => 'USA');

    const {getByTestId} = render(<NewsList />);
    const FlatList = getByTestId('newsList');

    expect(FlatList.props.data.length === 1).toBeTruthy();
  });

  it('renders error if api response is incorrect', () => {
    (useNewsQuery as jest.Mock<any>).mockImplementation(() => ({
      results: [],
      error: {response: {}},
      isLoading: false,
      newsResponse: {},
      locationFilters: [],
      keywordFilters: [],
    }));

    const {getByText} = render(<NewsList />);

    expect(
      getByText('Something went wrong, Please pull to refresh'),
    ).toBeTruthy();
  });

  it('renders error if api is not reachable or internet is not working', () => {
    (useNewsQuery as jest.Mock<any>).mockImplementation(() => ({
      results: [],
      error: {},
      isLoading: false,
      newsResponse: {},
      locationFilters: [],
      keywordFilters: [],
    }));

    const {getByText} = render(<NewsList />);

    expect(
      getByText(
        'Failed to connect with server, Please check your internet connection',
      ),
    ).toBeTruthy();
  });
});

const SAMPLE_DATA = [
  {
    section: 'theater',
    subsection: '',
    title: 'For a Broadway Torn by a Pandemic, a Split-Personalities Tonys',
    abstract:
      'The streaming part of the ceremony actually did a better job conveying the electricity of being in a theater than the CBS special billed as “Broadway’s Back!”',
    url: 'https://www.nytimes.com/2021/09/27/theater/tony-awards-ceremony-tv.html',
    uri: 'nyt://article/c973e5f9-470f-5afa-9ae7-a110f7fcc921',
    byline: 'By Jesse Green, Elisabeth Vincentelli and James Poniewozik',
    item_type: 'Article',
    updated_date: '2021-09-27T23:56:58-04:00',
    created_date: '2021-09-27T13:46:01-04:00',
    published_date: '2021-09-27T13:46:01-04:00',
    material_type_facet: '',
    kicker: '',
    des_facet: [
      'Theater',
      'Tony Awards (Theater Awards)',
      'Television',
      'Awards, Decorations and Honors',
      'Quarantine (Life and Culture)',
    ],
    org_facet: ['CBS Corporation', 'Paramount Plus'],
    per_facet: [],
    geo_facet: ['India'],
    multimedia: [
      {
        url: 'https://static01.nyt.com/images/2021/09/27/arts/27tonys-critic-convo-JH/merlin_195432066_89acc17b-8d69-4410-97a1-aab1cc885a9b-superJumbo.jpg',
        format: 'superJumbo',
        height: 2048,
        width: 1719,
        type: 'image',
        subtype: 'photo',
        caption:
          '“The combination of Sheryl Lee Ralph’s introduction and Jennifer Holliday’s performance of ‘And I Am Telling You I’m Not Going’ (above) is bound to become a YouTube classic,” the critic Elisabeth Vincentelli says.',
        copyright: 'Sara Krulwich/The New York Times',
      },
      {
        url: 'https://static01.nyt.com/images/2021/09/27/arts/27tonys-critic-convo-JH/27tonys-critic-convo-JH-thumbStandard.jpg',
        format: 'Standard Thumbnail',
        height: 75,
        width: 75,
        type: 'image',
        subtype: 'photo',
        caption:
          '“The combination of Sheryl Lee Ralph’s introduction and Jennifer Holliday’s performance of ‘And I Am Telling You I’m Not Going’ (above) is bound to become a YouTube classic,” the critic Elisabeth Vincentelli says.',
        copyright: 'Sara Krulwich/The New York Times',
      },
      {
        url: 'https://static01.nyt.com/images/2021/09/27/arts/27tonys-critic-convo-JH/27tonys-critic-convo-JH-thumbLarge.jpg',
        format: 'thumbLarge',
        height: 150,
        width: 150,
        type: 'image',
        subtype: 'photo',
        caption:
          '“The combination of Sheryl Lee Ralph’s introduction and Jennifer Holliday’s performance of ‘And I Am Telling You I’m Not Going’ (above) is bound to become a YouTube classic,” the critic Elisabeth Vincentelli says.',
        copyright: 'Sara Krulwich/The New York Times',
      },
      {
        url: 'https://static01.nyt.com/images/2021/09/27/arts/27tonys-critic-convo-JH/27tonys-critic-convo-JH-mediumThreeByTwo210.jpg',
        format: 'mediumThreeByTwo210',
        height: 140,
        width: 210,
        type: 'image',
        subtype: 'photo',
        caption:
          '“The combination of Sheryl Lee Ralph’s introduction and Jennifer Holliday’s performance of ‘And I Am Telling You I’m Not Going’ (above) is bound to become a YouTube classic,” the critic Elisabeth Vincentelli says.',
        copyright: 'Sara Krulwich/The New York Times',
      },
      {
        url: 'https://static01.nyt.com/images/2021/09/27/arts/27tonys-critic-convo-JH/merlin_195432066_89acc17b-8d69-4410-97a1-aab1cc885a9b-articleInline.jpg',
        format: 'Normal',
        height: 226,
        width: 190,
        type: 'image',
        subtype: 'photo',
        caption:
          '“The combination of Sheryl Lee Ralph’s introduction and Jennifer Holliday’s performance of ‘And I Am Telling You I’m Not Going’ (above) is bound to become a YouTube classic,” the critic Elisabeth Vincentelli says.',
        copyright: 'Sara Krulwich/The New York Times',
      },
    ],
    short_url: 'https://nyti.ms/3odkUyw',
  },
  {
    section: 'theater',
    subsection: '',
    title: 'The Best and Worst of the 74th Tony Awards',
    abstract:
      'Despite an evening split between streaming and TV, the message on Sunday night was clear: Broadway is back.',
    url: 'https://www.nytimes.com/2021/09/27/theater/tony-awards-best-worst-moments.html',
    uri: 'nyt://article/d1c70d2c-91b0-532b-a408-7bb6eebd897b',
    byline:
      'By Jesse Green, Stella Bugbee, Maya Salam, Sarah Bahr and Nancy Coleman',
    item_type: 'Article',
    updated_date: '2021-09-27T23:57:51-04:00',
    created_date: '2021-09-27T06:14:01-04:00',
    published_date: '2021-09-27T06:14:01-04:00',
    material_type_facet: '',
    kicker: '',
    des_facet: [
      'Theater',
      'Tony Awards (Theater Awards)',
      'Moulin Rouge!: The Musical (Play)',
      'The Inheritance (Play)',
      'Wicked (Play)',
    ],
    org_facet: [],
    per_facet: [
      'Byrne, David',
      'McDonald, Audra',
      'Menzel, Idina',
      'Smith, Lois',
      'Chenoweth, Kristin',
      'Holliday, Jennifer',
      'Tayeh, Sonya (1977- )',
      'Odom, Leslie Jr',
    ],
    geo_facet: ['USA'],
    multimedia: [
      {
        url: 'https://static01.nyt.com/images/2021/09/27/arts/27tonys-bestworst11-copyNQLN/merlin_195396564_0b6d22af-ee36-452d-83ac-58e54775b026-superJumbo.jpg',
        format: 'superJumbo',
        height: 1365,
        width: 2048,
        type: 'image',
        subtype: 'photo',
        caption: '',
        copyright: 'Sara Krulwich/The New York Times',
      },
      {
        url: 'https://static01.nyt.com/images/2021/09/27/arts/27tonys-bestworst11-copyNQLN/27tonys-bestworst11-thumbStandard.jpg',
        format: 'Standard Thumbnail',
        height: 75,
        width: 75,
        type: 'image',
        subtype: 'photo',
        caption: '',
        copyright: 'Sara Krulwich/The New York Times',
      },
      {
        url: 'https://static01.nyt.com/images/2021/09/27/arts/27tonys-bestworst11-copyNQLN/27tonys-bestworst11-thumbLarge.jpg',
        format: 'thumbLarge',
        height: 150,
        width: 150,
        type: 'image',
        subtype: 'photo',
        caption: '',
        copyright: 'Sara Krulwich/The New York Times',
      },
      {
        url: 'https://static01.nyt.com/images/2021/09/27/arts/27tonys-bestworst11-copyNQLN/merlin_195396564_0b6d22af-ee36-452d-83ac-58e54775b026-mediumThreeByTwo210.jpg',
        format: 'mediumThreeByTwo210',
        height: 140,
        width: 210,
        type: 'image',
        subtype: 'photo',
        caption: '',
        copyright: 'Sara Krulwich/The New York Times',
      },
      {
        url: 'https://static01.nyt.com/images/2021/09/27/arts/27tonys-bestworst11-copyNQLN/merlin_195396564_0b6d22af-ee36-452d-83ac-58e54775b026-articleInline.jpg',
        format: 'Normal',
        height: 127,
        width: 190,
        type: 'image',
        subtype: 'photo',
        caption: '',
        copyright: 'Sara Krulwich/The New York Times',
      },
    ],
    short_url: 'https://nyti.ms/3ib3JJQ',
  },
  {
    section: 'theater',
    subsection: '',
    title:
      '‘Moulin Rouge!’ and ‘The Inheritance’ Take Top Honors at Tony Awards',
    abstract:
      'The ceremony, held for the first time in more than two years, honored shows that opened before the pandemic and tried to lure crowds back to Broadway.',
    url: 'https://www.nytimes.com/2021/09/26/theater/broadway-tony-awards.html',
    uri: 'nyt://article/6012203c-a512-5a8d-ae4d-479e3cad39eb',
    byline: 'By Michael Paulson',
    item_type: 'Article',
    updated_date: '2021-09-27T18:10:29-04:00',
    created_date: '2021-09-26T22:45:11-04:00',
    published_date: '2021-09-26T22:45:11-04:00',
    material_type_facet: '',
    kicker: '',
    des_facet: [
      'Theater',
      'Tony Awards (Theater Awards)',
      'A Christmas Carol (Play)',
      'American Utopia (Album)',
      'Jagged Little Pill (Play)',
      'Moulin Rouge!: The Musical (Play)',
      'Slave Play (Play)',
      'The Inheritance (Play)',
      'The Sound Inside (Play)',
      'Tina: The Tina Turner Musical (Play)',
    ],
    org_facet: [],
    per_facet: [
      'Burstein, Danny',
      'Byrne, David',
      'Cody, Diablo',
      'Daldry, Stephen',
      'Grier, David Alan',
      'Holliday, Jennifer',
      'Harris, Jeremy O',
      'Luker, Rebecca',
      'Warren, Adrienne (1987- )',
      'Leon, Kenny',
      'McDonald, Audra',
      'Odom, Leslie Jr',
      'Parker, Mary-Louise',
      'Patten, Lauren',
      'Smith, Lois',
      'Timbers, Alex',
      'Tveit, Aaron',
    ],
    geo_facet: [],
    multimedia: [
      {
        url: 'https://static01.nyt.com/images/2021/09/26/arts/26tonys-moulin-swap/26tonys-moulin-swap-superJumbo-v2.jpg',
        format: 'superJumbo',
        height: 1365,
        width: 2048,
        type: 'image',
        subtype: 'photo',
        caption:
          'Two of the producers of &ldquo;Moulin Rouge!,&rdquo; Carmen Pavlovic and Bill Damaschke, accepted the Tony for best musical. &ldquo;I feel that every show of last season deserves to be thought of as the best musical,&rdquo; Pavlovic said.',
        copyright: 'Sara Krulwich/The New York Times',
      },
      {
        url: 'https://static01.nyt.com/images/2021/09/26/arts/26tonys-moulin-swap/26tonys-moulin-swap-thumbStandard.jpg',
        format: 'Standard Thumbnail',
        height: 75,
        width: 75,
        type: 'image',
        subtype: 'photo',
        caption:
          'Two of the producers of &ldquo;Moulin Rouge!,&rdquo; Carmen Pavlovic and Bill Damaschke, accepted the Tony for best musical. &ldquo;I feel that every show of last season deserves to be thought of as the best musical,&rdquo; Pavlovic said.',
        copyright: 'Sara Krulwich/The New York Times',
      },
      {
        url: 'https://static01.nyt.com/images/2021/09/26/arts/26tonys-moulin-swap/26tonys-moulin-swap-thumbLarge.jpg',
        format: 'thumbLarge',
        height: 150,
        width: 150,
        type: 'image',
        subtype: 'photo',
        caption:
          'Two of the producers of &ldquo;Moulin Rouge!,&rdquo; Carmen Pavlovic and Bill Damaschke, accepted the Tony for best musical. &ldquo;I feel that every show of last season deserves to be thought of as the best musical,&rdquo; Pavlovic said.',
        copyright: 'Sara Krulwich/The New York Times',
      },
      {
        url: 'https://static01.nyt.com/images/2021/09/26/arts/26tonys-moulin-swap/26tonys-moulin-swap-mediumThreeByTwo210.jpg',
        format: 'mediumThreeByTwo210',
        height: 140,
        width: 210,
        type: 'image',
        subtype: 'photo',
        caption:
          'Two of the producers of &ldquo;Moulin Rouge!,&rdquo; Carmen Pavlovic and Bill Damaschke, accepted the Tony for best musical. &ldquo;I feel that every show of last season deserves to be thought of as the best musical,&rdquo; Pavlovic said.',
        copyright: 'Sara Krulwich/The New York Times',
      },
      {
        url: 'https://static01.nyt.com/images/2021/09/26/arts/26tonys-moulin-swap/26tonys-moulin-swap-articleInline-v2.jpg',
        format: 'Normal',
        height: 127,
        width: 190,
        type: 'image',
        subtype: 'photo',
        caption:
          'Two of the producers of &ldquo;Moulin Rouge!,&rdquo; Carmen Pavlovic and Bill Damaschke, accepted the Tony for best musical. &ldquo;I feel that every show of last season deserves to be thought of as the best musical,&rdquo; Pavlovic said.',
        copyright: 'Sara Krulwich/The New York Times',
      },
    ],
    short_url: 'https://nyti.ms/3kH0onx',
  },
];
const locationFilters: Array<string> = Array.from(
  new Set(
    (SAMPLE_DATA ?? [])
      .map(({geo_facet}) => [...geo_facet])
      .reduce((a: any, b: any) => a.concat(b), [])
      .filter((_: any) => _),
  ),
);
const keywordFilters: Array<string> = Array.from(
  new Set(
    (SAMPLE_DATA ?? [])
      .map(({des_facet}) => [...des_facet])
      .reduce((a: any, b: any) => a.concat(b), [])
      .filter((_: any) => _),
  ),
);
