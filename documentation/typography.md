#`_typography.scss`
```
Version 2.0
Last Updated: December 3, 2018
Created by: Cory Monteleone
```
***
##Using the Typography File

The Typography file allows for control over the styles of the text on the page. This is primarily used for paragraph content and not for navigational content or other structural features. The delineation therein provides for a better visual heirarchy. The file is awaiting refactor for best practices and may be included in a subsequent patch.

```
@import 'links';
@import 'sizing';

```

Added Dec 2018, this import function extends typography by adding atomic utility classes to the framework. This allows for easier references when changing typography. A future refactor may include changes to the logic structure to make the available classes adhere to a rigid typographical heirarachy.

```
.md-bold {
  font: {
    weight: 600;
  }
}

.mb-16 {
  margin-bottom: 16px;
}

.mb-32 {
  margin-bottom: 32px;
}

.zTitle {
  @include media(mm) {
    font: {
      size: 22px;
    }
  }
}
```

Slated for refactor, atomic margins are created for whitespacing in paragraphs or title blocks. The title of the article is printed in a larger size at the table size to leverage space.


```
@each $key, $value in $weights {
  .fw-#{$key} {
    font: {
      weight: $value;
    }
  }
}
```

This will be moved, but the function will remain in a future version, where atomic elements are created for the various weights.

```
main .ms-rtestate-field {
  h1 {
    color: #414F5A;
    font-weight: 600;
  }

  h2 {
    color: #414F5A;
    font-weight: 400;
  }

  h3,
  h4 {
    color: #333;
  }
}
```

Headers are set. Colors will be refactored to move into variable usage.