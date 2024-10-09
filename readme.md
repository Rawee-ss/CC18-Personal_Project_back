## PERSONAL PROJECT

### SERVICE

| METHOD      | PATH           | AUTHEN | PARAMS | QUERY | BODY                                            |
| :---------- | :------------- | :----- | :----- | :---- | :---------------------------------------------- |
| post        | /auth/register | -      | -      | -     | {identity, birthday, confirmPassword, password} |
| post        | /auth/login    | -      | -      | -     | {identity, password}                            |
| patch       | /profile       |        |        |       |                                                 |
| get         | /              |        |        |       |                                                 |
| get         | /product       |        |        |       |                                                 |
| post        | /product       |        |        |       |                                                 |
| patch       | /product       |        | :id    |       |                                                 |
| delete      | /product       |        | :id    |       |                                                 |
| get         | /favorite      |        |        |       |                                                 |
| delete      | /favorite      |        | :id    |       |                                                 |
| get         | /cart          |        |        |       |                                                 |
| delete      | /cart          |        | :id    |       |                                                 |
| get         | /store         |        |        |       |                                                 |
| delete      | /store         |        | :id    |       |                                                 |
| get         | /order         |        |        |       |                                                 |
| delete      | /order         |        | :id    |       |                                                 |
| Transaction | /order         |        |        |       |                                                 |
