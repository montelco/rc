#`_padding.scss`
```
Version 1.0
Last Updated: October 14, 2018
Created by: Cory Monteleone
```
***
##Using the Padding File

This file is awaiting refactor to leverage more variables and features of SASS. It creates the atomic level style for padding on all elements within the codebase, unless there are BEM blocks which create modifiers. Future refactors will call to this file for all padding.

```
$padding: 0;
$plist: top left bottom right;
$break-vals: xs sm md lg xl wl;
```

The variables, which will be moved into the variables file for easier access. The list denotes the possible items in the array to be looped, so too with the prefixes for breakpoints. Formatting for the resultant classes fits the following pattern: 

```
// Pixel value-based padding for directions; Atomic
@while ($padding < 256) {
  // Unidirectional
  @each $direction in $plist {
    .pd-#{$direction}\:#{$padding} {
      padding-#{$direction}: #{$padding}px;
    }
  }
```

The padding can atomically be added to a single dimension or side. 

```
  // All sides
  .pd\:#{$padding} {
    padding: #{$padding}px;
  }
```

Or the padding can be evenly applied to all sides.

```
  // Increments the counter
  @if ($padding == 0) {
    $padding: $padding + 2;
  } @else {
    $padding: $padding * 2;
  }
}
```

The counter to continue the padding at multiples of two (2,4,8,16,32,etc). 

```
// Utility padding based on text sizing; must use all sides for even spacing with text
// $padding: 0;
// @while ($padding <= 1) {
//   @each $break-val in $break-vals {
//     .pd- {
//       padding: rem 0;
//     }
//   }
//   $padding: $padding + .125;
// }
```

Deprecated typography padding.

```
.pd {
  &-xs {padding: .125rem 0}
  &-xs-xs {@include media(xs) {padding: .125rem 0}}
  &-sm {padding: .250rem 0}
  &-md {padding: .375rem 0}
  &-lg {padding: .500rem 0}
  &-xl {padding: .625rem 0}
  &-wl {padding: .750rem 0}
}
```
Root text size-based padding. These are not tied to breakpoints, so they will be aliased in a future version to remove ambiguity.

