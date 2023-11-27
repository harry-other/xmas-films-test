# Tesco Xmas Films coding challenge

This project is a recent Xmas campaign consisting of a small Django backend plus React frontend.

To open the project, in VS Code select `File` -> `Open Workspace from File` -> `xmas-films.code-workspace`

You can then follow the `readme.md` files in the FE and BE folders in order to setup each component.

The tasks we'd like you to perform are as follows:

1. Add a `ReservationManager` with a custom `create` method.

- This should use the provided `screening` and `quantity` kwargs to sense-check the values are acceptable, given the current state of the data in the `Reservation` table.
- If there is an issue, a `ValidationError` should be rasied.
- The method should make use of `transaction.atomic` and `select_for_update` to guard against race conditions
- Tests should be added to cover this new functionality

2. Add a custom ScreeningQuerySet with a `with_sold_out` query

- This should return a boolean annotation indicating whether each `Screening` in the query is sold out or not
- This status should be added to the `ScreeningSerializer` so it can be used on the FE
- Tests should be added to cover this new functionality

3. Re-instate the `allocate_tickets` method on the `Reservation` model

- This is called when a `Reservation` is created or updated (if the project was larger we would have made custom workflows to do this, rather than overloading the change form to provide the update capability)
- This function should assign a set of `Ticket` rows to the `Reservation`, depending on the `quantity` set
- A `Ticket` is valid for a specific `Film` - this should match the `Film` for the `Screening` being reserved
- If the quantity is zero, all the `Ticket` set should be unlinked from the `Reservation`
- If the `Film` is changed as part of the update, the current `Ticket` set should be unlinked, and a new set for the correct `Film` linked instead
- Tests should be added to cover this new functionality

4. Chunk-based AccessCode creation

- Create a management command to generate random access codes (should be passed in via a CLI arg)
- The codes should be in the format XXXX-XXXX-XXXX-XXXX where x is an uppercase letter or number, vowels should be excluded to avoid innappropriate words from being formed
- The command should gracefully handle the fact that two codes _might_ be generated with the same value (this wouldn't be allowed at the DB level as the field is `unique`)
- The command should be capable of creating a million codes in a reasonable time, ie. the codes should be written to the DB in bulk (batch size should be around 10k)
- The chunks should also be written out to a CSV file
