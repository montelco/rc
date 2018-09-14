#`_evergreen.scss`
```
Version 1.0
Last Updated: September 14, 2018
Created by: Cory Monteleone
```
***
##Using the Evergreen File

This file is named for content areas that use a thumbnail and short description, but no card. To create visual interest, there are accent colors that are added above the image. The evergreen utility will likely be renamed in v1.4 and will be refactored to use variable colors and a color mixin. This block is organized using BEM structuring. 

```
.evergreen {
  margin-bottom: 32px;
```

The `.evergreen` has some typography-based spacing at the bottom. This will be refactored in a later version to call to a spacing function.

```
&__accent {
    height: 8px;
    width: 64px;
```

The `.evergreen__accent` is an element that has a 1:8 ratio to create a slight visual cue that intrigues a user. 

```
&.a {background: #426492;}
  &.b {background: #92c4c5;}
  &.c {background: #8ca1bc;}
  &.d {background: #b7c1cb;}
}
```

The `.evergreen__accent.{a|b|c|d}` is defaulted four accent colors. __This will be kept as legacy for classes but will be refactored to allow for more dynamic loading, and theming.__

```
  h3 {
    color: black;
    font: {
      size: 24px;
      weight: 600;
    }
  }
  h4 {
    color: black;
    font: {
      size: 15px;
      weight: 400;
    }
    margin-top: 8px;
    margin-bottom: 24px;
  }
```

The dependent elements of the `.evergreen` mean that the title `h3` and the body `h4` use are given a semi-bold weight and a larger size. The exact measures will be refactored in a future update for better dynamic scaling.

```
  img {width: 100%;}
```

An `img` within an `.evergreen` should fill the containing element. By default, the browser will assign an automatic height, so the declaration would be redundant.

```
  a {
    color: black;
    font: {
      size: 16px;
      weight: 600;
    }
    &:after {content: "»"}
  }
}
```

The `.evergreen` has an action link after its title and body. This sets the weight consistent with the remainder of the block and append the suffix `»` after the link text to distinguish it as a link.