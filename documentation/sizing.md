#`_sizing.scss`
```
Version 1.0
Last Updated: December 3, 2018
Created by: Cory Monteleone
```
***
##Using the Sizing File

This file is used for th atomic text sizing within the codebase. The classes here are universal but will be refactored in a later version to have values which adequately represent the needs of each unit selected whilst adhering to the visual heirarchy and the typography standards.

```
$font-em-max: 12;
$font-rm-max: 16;
$font-pt-max: 48;
$font-pe-max: 150;
```

Variable maximum values are set in this first block.

```
$font-units: () !default;
$font-units: map-merge(
  (
    "em": $font-em-max,
    "rm": $font-rm-max,
    "pt": $font-pt-max,
    "pe": $font-pe-max
  ),
  $font-units
);
```

The previously set values are now merged with the unit map which references the unit type directly and will be used further on in the application.

```
@each $name, $value in $font-units {
  $max: $value;
  $unit: $name;
  $i: 1;
  @for $i from 1 to $max {
    .font-size-#{$unit}-#{$i} {
      @if($unit == 'pe') {
        font: {
          size: #{$i}#{'%'};
        }
      } @else {
        font: {
          size: #{$i}#{$unit};
        }
      }
    }
    $i: $i+1;
  }
}
```

For every unit in the map where there is a set value, iterate through and create a style which is equal to the current iterative value relative to its maximum. However, if it is a percentage, the escaped percentage is isolated into its own condition.
