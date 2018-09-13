#`_eqHeight.scss`
```
Version 1.0
Last Updated: September 13, 2018
Created by: Cory Monteleone
```
***
##Using the eqHeight File

Elements that share a common horizontal container such as a `.row` are usually various heights unless tightly controlled. Unfortunately for dynamically-driven sites, this means that there is always some uncertainty as the sizing. Without overcomplicating things and forcing a fixed height and dealing with overflow and scaling fonts, this patch file is designed to provide equal height to elements which take its specificity. Currently, as of v1.0, this is only supported in the homepage configuration, but it can be generalised to more areas should there be a sufficient use case. In that case, this file will be deprecated and refactored into a mixin. Note that this file has full prefixing to account for differences in browser engines.

```
@include media(lg) {
```
This code is 'sandboxed' to large displays as the use of horizontal elements only occurs on wide enough displays.

```
  #whatsNew div.d-flex {
```

This lets the code become active if the elements within the `#whatsNew` container are in a `div.d-flex` element. Without the `.d-flex`, this will not evaulate as true.

```

    div[id^='ct100_PlaceHolderMain'],
    div[webpart] {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-flex: 1 1 auto;
      -webkit-flex: 1 1 auto;
          -ms-flex: 1 1 auto;
              flex: 1 1 auto;
    }
```

This affects anything coming from the CMS directly and should be changed if the CMS applies any wrapping elements around dynamically driven content. The matching patterns detailed state that the content should be flex displayed and also flex-grow and flex-shrink if they are the child of a containing flex item.

```
    & > div {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-flex: 1 1 auto;
      -webkit-flex: 1 1 auto;
          -ms-flex: 1 1 auto;
              flex: 1 1 auto;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
          -ms-flex-direction: column;
              flex-direction: column;
      /* div[id^='ct100_PlaceHolderMain'] {*/
      /*   display: flex;*/
      /*   flex: 1 1 auto;*/
      /* }*/
```

The `div` that is a direct descendant of the flexible containing element is now able to grow and shrink accordingly. It will also display its child elements using display flex and the direction of the flex will be vertical (column) over the default of row.

```
      .card {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
            -ms-flex: 1 1 auto;
                flex: 1 1 auto;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
            -ms-flex-direction: column;
                flex-direction: column;
        width: 100%;
```

Any `.card` that is a child of the direct descendant `div` above is now able to grow and shrink accordingly. It will also display its child elements using display flex and the direction of the flex will be vertical (column) over the default of row.

```
        &__body {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-flex: 1 1 auto;
          -webkit-flex: 1 1 auto;
              -ms-flex: 1 1 auto;
                  flex: 1 1 auto;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -webkit-flex-direction: column;
              -ms-flex-direction: column;
                  flex-direction: column;
```

The `.card`'s `.card__body` that is now able to grow and shrink accordingly. It will also display its child elements using display flex and the direction of the flex will be vertical (column) over the default of row.

```
          &.np a {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
                -ms-flex: 1 1 auto;
                    flex: 1 1 auto;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -webkit-flex-direction: column;
                -ms-flex-direction: column;
                    flex-direction: column;
          }
        }
```

An anchor that is within the `.card__body.np` container is now able to grow and shrink accordingly. It will also display its child elements using display flex and the direction of the flex will be vertical (column) over the default of row.


```
        &__event {-webkit-box-flex: 1 1 auto;-webkit-flex: 1 1 auto;-ms-flex: 1 1 auto;flex: 1 1 auto;}
      }
    }
  }
}
```

The wrapping `event` class for calendar-type `.card`s is likewise set to grow and shrink but does not display flex as it is not needed.

```
@include media(md) {
  // IE gets punished for existing. We're okay with giving a slightly worse experience since it's not a major piece.
  // Everyone else gets nicely sized cards.
  @supports not (-ms-high-contrast: none){
```

For any non-IE browser (Edge is able to access these styles), highlights are similarly made to be flexible.

```
    #Highlights {
      .card__body.lp {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -webkit-flex: 1 1 auto;
            -ms-flex: 1 1 auto;
                flex: 1 1 auto;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
            -ms-flex-direction: column;
                flex-direction: column;
```

The `#Higlights .card__body.lp` is now able to grow and shrink accordingly. It will also display its child elements using display flex and the direction of the flex will be vertical (column) over the default of row.

```
        &>a:nth-of-type(1){
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-flex: 1;
          -webkit-flex: 1 1 auto;
              -ms-flex: 1 1 auto;
                  flex: 1 1 auto;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -webkit-flex-direction: column;
              -ms-flex-direction: column;
                  flex-direction: column;
        }
      }
```

If `#Higlights .card__body.lp>a:nth-of-type(1)` is present (being a clickable Highlight card), it now able to grow and shrink accordingly. It will also display its child elements using display flex and the direction of the flex will be vertical (column) over the default of row.

```
      .card__body.lp a{
        @include hover-focus-active{color: $body-color !important;}
```

The anchor within the body `.card__body.lp a` will also have a state consistent with the body color instead of hyperlink color. This is set using the mixin for hover and related states.

```
        h3 {
          font-size: 100%;
          color: $body-color;
        }
```

The header `h3` with the above anchor (`.card__body.lp a`) on the body should be the default size and have the standard body text color.

```
        p {
          font-size: 85%;
          color: $body-color;
        }
```

The paragraph text `p` with the above anchor (`.card__body.lp a`) on the body should be the default size and have the standard body text color.

```
        a strong {
          @include hover-focus-active{color: $body-color}
          font-size: 80%;
        }
      }
```

The anchor `a` with the above anchor (`.card__body.lp a`) on the body should be the default size and have the standard body text color. The purpose of this is to have an actionable text to indicate that the card is clickable since the color is set to resemble body text.

```
      .row .col-md-4 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
```

The containing element for the card and its dynamic container, `.row .col-md-4`, should be flexible. In this case, there is only one direct descendant thus direction need not be set and the element iteself is not within a flex container thus flex grow and shrink do not need to be set.

```
        .card {
          -webkit-box-flex: 1;
          -webkit-flex: 1 1 auto;
              -ms-flex: 1 1 auto;
                  flex: 1 1 auto;
        }
      }
    }
  }
}
```

The card that is within the `col-md-4` should grow and shrink according to the sibling elements' response to the paint listener and thus the card must respond to it by growing and shrink if either its parent or child says so.

```

@include media(lg) {
  #Calendar {
    div[id^='ct100_PlaceHolderMain'],
    div[webpart] {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-flex: 1 1 auto;
      -webkit-flex: 1 1 auto;
          -ms-flex: 1 1 auto;
              flex: 1 1 auto;
    }
```

This lets the code become active if the elements within the `#calendar` container. This affects anything coming from the CMS directly and should be changed if the CMS applies any wrapping elements around dynamically driven content. The matching patterns detailed state that the content should be flex displayed and also flex-grow and flex-shrink if they are the child of a containing flex item.

```
    & > div {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-flex: 1 1 auto;
      -webkit-flex: 1 1 auto;
          -ms-flex: 1 1 auto;
              flex: 1 1 auto;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
          -ms-flex-direction: column;
              flex-direction: column;
      /* div[id^='ct100_PlaceHolderMain'] {*/
      /*   display: flex;*/
      /*   flex: 1 1 auto;*/
      /* }*/
```

The `div` that is a direct descendant of the `#calendar` element is now able to grow and shrink accordingly. It will also display its child elements using display flex and the direction of the flex will be vertical (column) over the default of row.

```
      &.card {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
            -ms-flex: 1 1 auto;
                flex: 1 1 auto;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
            -ms-flex-direction: column;
                flex-direction: column;
        width: 100%;
```

Any `.card` that is a child of the direct descendant `div` above is now able to grow and shrink accordingly. It will also display its child elements using display flex and the direction of the flex will be vertical (column) over the default of row.

```
        &__body {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-flex: 1 1 auto;
          -webkit-flex: 1 1 auto;
              -ms-flex: 1 1 auto;
                  flex: 1 1 auto;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -webkit-flex-direction: column;
              -ms-flex-direction: column;
                  flex-direction: column;
```

The `.card`'s `.card__body` that is now able to grow and shrink accordingly. It will also display its child elements using display flex and the direction of the flex will be vertical (column) over the default of row.

```
          &.np a {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
                -ms-flex: 1 1 auto;
                    flex: 1 1 auto;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -webkit-flex-direction: column;
                -ms-flex-direction: column;
                    flex-direction: column;
          }
        }
```

An anchor that is within the `.card__body.np` container is now able to grow and shrink accordingly. It will also display its child elements using display flex and the direction of the flex will be vertical (column) over the default of row.


```
        &__event {-webkit-box-flex: 1 1 auto;-webkit-flex: 1 1 auto;-ms-flex: 1 1 auto;flex: 1 1 auto;}
      }
    }
  }
}
```

The wrapping `event` class for calendar-type `.card`s is likewise set to grow and shrink but does not display flex as it is not needed.
