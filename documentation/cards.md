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

The `.card__thumbnail` contains the `img` which is adjusted to cover the containing element and is sized at 100% the width and height of the container (where cover will appropriately maintain proportions and use percentage as a fallback on older devices). Additionally, the borders are set to be rounded and fit with the look and feel of the card.

```
  &__body {
    padding: 25px;
    background: $white;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
```

A `.card`, in addition to having a thumbnail, may also have a `.card__body` which is generally a white field with 25px of padding and a radius to adhere to card designs. 

```
    &.np{padding:0;}
```

Some cases may arise where a `.card__body` does not need padding. For this reason, `.card__body.np` allows for this use case. Note that this will be depreacted in v1.2, preferring an atomic class. Use will not change (still being `.np`) but will no longer be tied to the block.

```
    &.lp{
      padding: 0 8px;
      border-top-left-radius: 0px;
      border-top-right-radius: 4px;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 4px;
```

Some cases may arise where a `.card__body` may need light padding. For this reason, `.card__body.lp` allows for this use case. Note that this will be depreacted in v1.2, preferring an atomic class. Use will not change (still being `.lp`) but will no longer be tied to the block. 

```
    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      -webkit-box-flex: 1;
      -webkit-flex: 1 1 auto;
          -ms-flex: 1 1 auto;
              flex: 1 1 auto;
    }
```

This block allows a device using the Internet Explorer render engine to access features enabled with the flex code as used on the `.card__body`.

```
    @include media (nml) {
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
```

On smaller desktops and tablets, a `.card__body` will have a border radius on the bottom but not top.

```
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
```

The title of the card body, `.card__body h3` will have font sizing of 1em at anything less than a tablet, 1.05em at tablet or greater, and 1.15em at a desktop or greater.

```
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
```

The text content of the card body (assumed to be `span` or `p`) will have font sizing of .725em at anything less than a tablet, .75em at tablet or greater, and .85em at a desktop or greater.

```
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
```

For a list of items on a card, the `ul`'s padding is reduced to zero instead of the standard 2x (24px,25px) padding applied. This keeps the content easier to read. However, to allow for whitespace, its `li` is give a padding on the bottom. Any anchors within the `.card`'s `ul li` use the mixin for appending state transformations to keep appearance consistent. With the last `li`, there is no padding so as to not overstep the impact of using this code. For clarity on smaller devices, a list is limited to seven items. This, will be deprecated in v1.2 as it is an assumed modifier and is broad in scope.

```
  strong a:visited {color: $link-color;}
```

Any bolded anchor will assume the application's default link color.

```
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
```

A `.card` is often used for discrete information such as an event with its pertinent information. Hence, the `.card__date` can be used to create an element which has no padding and an accent color on the left. Within the element, the month and day are give uppercasing and are centered. The date number is at 32px font and the month is at half that, 18px. In v1.1 this will be dynamically written with variables.

```
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
```

A `.card` which is used for discrete events may need to have `.card__details` which default to 12px font and may have a title which defaults to twice the before. In v1.1 this will be dynamically written with variables.

```
  &__event {
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    border-bottom: 1px solid $gray-300;
    line-height: 1.125;
  }
```

A `.card` which is used for discrete events may need to have information about the occurence. For this, `.card__event` has no margins. A `.card__event` is the "row" which then contains a `.card__date` and `.card__details`. As this is a containing element, there is a bottom border to distinguish its area and it is sized with border-box to prevent adding height where not needed.

```
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
A `.card` may also be a "Push Content Box" which promotes a specific piece of actionable information. A `.card#pushContent` will be an accent color variable with white text and will have a title `h2` that inherits its color from the container, a body `h3` and an actionable link `.card#pushContent a.pushCTA` which is accented to contrast the background of the container and thus prompt attention.