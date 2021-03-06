## Container

- This component acts as a wrapper component for any screen, it handles the statusbar color and style on both Platform, i.e. iOS and Android.

**Props**

- children

| Type      | Default | Required |
| --------- | ------- | -------- |
| ReactNode | none    | no       |

- backgroundColor

| Type   | Default              | Required |
| ------ | -------------------- | -------- |
| string | theme.colors.surface | no       |

- statusBarBackgroundColor

| Type   | Default              | Required |
| ------ | -------------------- | -------- |
| string | theme.colors.primary | no       |

- statusBarStyle

| Type           | Default         | Required |
| -------------- | --------------- | -------- |
| StatusBarStyle | 'light-content' | no       |

## NewsItem

- This component is for displaying any particular news, it has the following props.

**Props**

- title

| Type   | Default | Required |
| ------ | ------- | -------- |
| string | none    | yes      |

- multimedia

| Type                   | Default | Required |
| ---------------------- | ------- | -------- |
| NEWS_MULTIMEDIA_ITEM[] | none    | yes      |

```
type NEWS_MULTIMEDIA_ITEM = {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
};
```

- byline

| Type   | Default | Required |
| ------ | ------- | -------- |
| string | none    | yes      |

- published_date

| Type   | Default | Required |
| ------ | ------- | -------- |
| string | none    | yes      |
