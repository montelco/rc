#`_cards.scss`
```
Version 1.0
Last Updated: September 12, 2018
Created by: Cory Monteleone
```
***
##Using the Cards File

To create elements that are distinct and call attention as a discrete unit of information, a card can be stylistically used to create such a 'chunked' informational experience. Cards generally have rules to which they adhere. Cards should not be used purely out of preference, but play a functional role in briefly describing and orienting content to a user. Cards are a medium which must follow rules similar to that of [Material Design beliefs](https://material.io/design/introduction). The use of the card is for the benefit of the user and should be used so as to not exhaust the delineation of information. Cards have a softened edge and a shadow which suggests that they are distinct and sit apart from the field on which they lay.
```
.card {
  background: var(--white);
  border-radius: 4px;
  -webkit-box-shadow: 0 2px 2px 2px rgba(25, 25, 25, .08);
          box-shadow: 0 2px 2px 2px rgba(25, 25, 25, .08);
  font: {
    family: $font-family-base !important;
    size: $font-size-base !important;
  }
```

A `.card` is defined as a white element witch has a rounded corner of 4px and two drop shadows. By default a card will use the application's font family and default font size.

```
  @media screen and (max-width: $lg) {margin-bottom: 30px;}
  @media screen and (min-width: $lg + 1) {margin-bottom: 15px;}
```

A `card` on a smaller display will have a space below is twice as large as when it is on a desktop. This is being deprecated and refactored to use variables and functions in v1.1.

```
  &__header {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    font-size: 22px;
    padding: 5px 12px;
```

A `.card`'s `.card__header`, given that it is at the top, will have a border radius on the top and will have a slightly larger font size. Padding is being refactored to be more even.

```
    h3 {
      color: inherit;
      font: {
        weight: 600;
      }
      line-height: 2;
      svg {
        margin-top: -4px;
        vertical-align: middle;
        fill: currentColor; 
      }
    } 
  }
```

The `.card__header` contains an `h3` and a neighbouring `svg` to iconographically represent the area. The color is inherited from the header and thus the card and is meant to be bold and have a height that is twice the font height. A neighboring `svg` will be positioned vertically middle and will inherit the text's color.

```
  #Calendar &__body a,
  #Highlights &__body {
    color: $body-color !important;
  }
```

For the `#Highlights` and `#Calendar`, the `.card__body {a}` will inherit the default body color.

```
  &__thumbnail {
    -webkit-flex-basis: calc(150px);
        -ms-flex-preferred-size: calc(150px);
            flex-basis: calc(150px);
    height: 150px;
    padding: 0;
    margin: 0;
    -webkit-box-flex: 0;
    -webkit-flex-grow: 0;
        -ms-flex-positive: 0;
            flex-grow: 0;
    -webkit-flex-shrink: 0;
        -ms-flex-negative: 0;
            flex-shrink: 0;
    width: 150px;
```

The `.card__thumbnail` is the containing element for the image featured on a card. It will default to 150px by 150px and will not have any padding or margin to use the full space available.

```
    @include media(mm) {
      -webkit-flex-basis: 120px;
          -ms-flex-preferred-size: 120px;
              flex-basis: 120px;
      height: 120px;
    }
    @include media(nml) {
      width: 100%;
      height: auto;
    }
```

Refer to the documentation for the media mixin for more on the operation and use of it, but in this instance a `card__thumbnail` for mobile devices has a dimesion space of 120px by 120px and on smaller desktops and tablets will default to drawing based on the available container up to 100% with the height being automatically drawn after.

```
    img {
      -o-object-fit: cover;
         object-fit: cover;
      width: 100%;
      height: 100%;
      border-top-left-radius: 4px;
      border-top-right-radius: 0px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 0px;
      @include media (nml) {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
      }
    } 
  }
```



```
  &__body {
    padding: 25px;
    background: $white;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    &.np{padding:0;}

    &.lp{
      padding: 0 8px;
      border-top-left-radius: 0px;
      border-top-right-radius: 4px;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 4px;

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      -webkit-box-flex: 1;
      -webkit-flex: 1 1 auto;
          -ms-flex: 1 1 auto;
              flex: 1 1 auto;
    }

    @include media (nml) {
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    h3 {
      @include media(mm) {
        font: {
          size: 1em;
        }
      }
      @inlcude media(md) {
        font: {
          size: 1.05em;
        }
      }
      @inlcude media(lg) {
        font: {
          size: 1.15em;
        }
      }
    }
    @include media(mm) {
      font: {
        size: 0.725em;
      }
    }

    @include media(md) {
      font: {
        size: 0.75em;
      }
    }

    @include media(lg) {
      font: {
        size: 0.85em;
      }
    }

  }

    ul{
      padding-left: 0;
      &>li{
        padding-bottom: 24px;
        line-height: 1;
        &>a{
          @include hover-focus-active{color: $link-color !important;}
          font-size: 14px;
          color: $link-color !important;
        }
      }
      &>li:last-child {
        padding: 0;
      }
      @media screen and (max-width: $wl - 1) {
        &>li:nth-of-type(n+7) {display: none;}
      }
    }
  }

  strong a:visited {color: $link-color;}

  &__date{
    padding: 0;
    border-left: 4px solid $qnBlue;

    h1,
    h2 {
      text-align: center;
      text-transform: uppercase; 
    }

    h1 {
      font: {
        size: 32px;
        weight: 400;
      }
    }

    h2 {
      font: {
        size: 18px;
        weight: 600;
      }
    }
  }

  &__details {
    h2 {
      font: {
        size: 24px;
        weight: 600;
      }
    }
    font: {
      size: 12px;
      weight: 600;
    }
  }

  &__event {
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    border-bottom: 1px solid $gray-300;
    line-height: 1.125;
  }

  &#pushContent {
    background: $pcBlue;
    color: $white !important;
    font-size: 1.6rem !important;
    padding: 24px;

    h2 {
      font-size: 1.25em;
      @media screen and (max-width: $wl - 1) {font-size: 1.15em;}
      @include media(mm) {
        font-size: 1em;
        padding-bottom: 1em;
        margin: 0;
      }
      font-weight: 600;
      padding-bottom: 32px;
      color: inherit !important;
    }

    h3 {
      color: inherit !important;
      font-size: 26px;
      @media screen and (max-width: $wl - 1) {font-size: 24px;}
      @media screen and (max-width: $lg - 1) {font-size: 22px;}
      @include media(lg) {-webkit-box-flex: 1;-webkit-flex: 1;-ms-flex: 1;flex: 1;}
      @include media(mm) {
        font-size: .75em;
        padding-bottom: 1em;
      }
      font-weight: 400;
      padding-bottom: 48px;

      a {
        color: $yellow;
        text-decoration: underline;
      }
    }

    a.pushCTA {
      display: block;
      width: 100%;
      background: $yellow;
      color: $body-color !important;
      font-size: 16px;
      padding: 16px 0;
      text-align: center;
      font-weight: bold;
      border-radius: 2px;
    }
  }
}
```
