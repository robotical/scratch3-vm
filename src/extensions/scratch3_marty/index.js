/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCiAgIHdpZHRoPSIxNDIuMTE5bW0iCiAgIGhlaWdodD0iMTQyLjExOW1tIgogICB2aWV3Qm94PSIwIDAgMjEwIDI5NyIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ic3ZnOCI+CiAgPGRlZnMKICAgICBpZD0iZGVmczIiPgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICB4bGluazpocmVmPSIjbGluZWFyR3JhZGllbnQxMDA1IgogICAgICAgaWQ9ImxpbmVhckdyYWRpZW50NTUzMCIKICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIgogICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSg5LjgzNTIwNTQsMy43NTQ2NTU2KSIKICAgICAgIHgxPSItMTIuMTMxNDg2IgogICAgICAgeTE9IjE3OS43Njg3NSIKICAgICAgIHgyPSIzNS45ODgzODQiCiAgICAgICB5Mj0iMTc5Ljc2ODc1IiAvPgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQxMDA1Ij4KICAgICAgPHN0b3AKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6I2YwYzAwMDtzdG9wLW9wYWNpdHk6MTsiCiAgICAgICAgIG9mZnNldD0iMCIKICAgICAgICAgaWQ9InN0b3AxMDAxIiAvPgogICAgICA8c3RvcAogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZjBjMDAwO3N0b3Atb3BhY2l0eTowOyIKICAgICAgICAgb2Zmc2V0PSIxIgogICAgICAgICBpZD0ic3RvcDEwMDMiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICB4bGluazpocmVmPSIjbGluZWFyR3JhZGllbnQ5NzQiCiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQ5NzYiCiAgICAgICB4MT0iLTMuMTQ5OTQ4NiIKICAgICAgIHkxPSIxOTEuNTUyNCIKICAgICAgIHgyPSI0NC45Njk5MjUiCiAgICAgICB5Mj0iMTkxLjU1MjQiCiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQuMDc0MTUzNiwtMTcuOTkxNzUyKSIgLz4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaWQ9ImxpbmVhckdyYWRpZW50OTc0Ij4KICAgICAgPHN0b3AKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6I2Y5YzYwMDtzdG9wLW9wYWNpdHk6MTsiCiAgICAgICAgIG9mZnNldD0iMCIKICAgICAgICAgaWQ9InN0b3A5NzAiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNmOWM2MDA7c3RvcC1vcGFjaXR5OjA7IgogICAgICAgICBvZmZzZXQ9IjEiCiAgICAgICAgIGlkPSJzdG9wOTcyIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNSI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPHBhdGgKICAgICBpZD0icGF0aDg3MSIKICAgICBkPSJNIDI1MS44NjI0MSwxNDguNSBBIDE0Ni44NjI0MSwxNDYuODYyNDEgMCAwIDEgMTA1LDI5NS4zNjI0MSAxNDYuODYyNDEsMTQ2Ljg2MjQxIDAgMCAxIC00MS44NjI0MTEsMTQ4LjUgMTQ2Ljg2MjQxLDE0Ni44NjI0MSAwIDAgMSAxMDUsMS42Mzc1ODg1IDE0Ni44NjI0MSwxNDYuODYyNDEgMCAwIDEgMjUxLjg2MjQxLDE0OC41IFoiCiAgICAgc3R5bGU9Im9wYWNpdHk6MTt2ZWN0b3ItZWZmZWN0Om5vbmU7ZmlsbDojYjJlNGYxO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDowLjQwNTIzMTIxO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTttYXJrZXI6bm9uZTtwYWludC1vcmRlcjpzdHJva2UgZmlsbCBtYXJrZXJzIiAvPgogIDxnCiAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMS4wNTQ5MDY4LDAsMCwxLjA1NDkwNjgsLTcuNjQzNzA1NiwtNC41OTg4MzI5KSIKICAgICBpZD0iZzE0OTEiPgogICAgPGcKICAgICAgIGlkPSJnMTg5OS01IgogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMS41MDYwMzMsMCwwLDEuNTA2MDMzLC01My4wNjUzNiwtNzYuNzkzNzQ4KSI+CiAgICAgIDxnCiAgICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KC0wLjk5OTgyODQyLDAuMDE4NTIzNjUsMC4wMTg1MjM2NSwwLjk5OTgyODQyLDIwNi42OTAzLC0zLjMyNTIwMTYpIgogICAgICAgICBpZD0iZzE3ODQtMy0yIj4KICAgICAgICA8ZwogICAgICAgICAgIGlkPSJnMTgyNy00IgogICAgICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjE4MTI0OTc4LDAuOTI5NTU4NTcpIj4KICAgICAgICAgIDxwYXRoCiAgICAgICAgICAgICBzdHlsZT0ib3BhY2l0eToxO3ZlY3Rvci1lZmZlY3Q6bm9uZTtmaWxsOiM1YmNiZjU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuMjM1NjMzMTNweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgICAgICBkPSJtIDEzNS41ODg3NCwzNzIuMDczODYgYyAtMC4zMjE3Myw0NC4xOTA3NiAtMC4xNTY5NCw5NC43MDQgLTAuMjMxMzIsMTM4Ljg5NDg5IDQuNzg1NzUsLTEuMDA0NjkgMTUuMjU0NjQsMy42OTAwNCAxMi45OTAyNCwtNC4zODQ3NyAtMC4xNzE3MiwtOS4yNjUzNyAtMC4zNDM5MiwtMTguNTMxNSAtMC41MTU2MywtMjcuNzk2ODcgbCAzMC4xODM1OSwtMS41NjQ0NSB2IC0zMC4xMDM1MiBoIDMzLjU5NzY2IHYgMzEuMTc3NzQgbCAyNy42NjAxNiwwLjczNjI2IC0wLjM1MzUyLDMzLjEzODc0IGMgMCwwIDE1LjcwOTk3LDIuNzU5MjEgMTIuOTcwNywtNi4zNTkzOCAtMC4xMzgxNCwtNDMuODA1MjggLTAuOTA2NDYsLTg3LjYxNDQxIC0wLjIzNjMyLC0xMzEuNDE3OTcgLTYuMDcxMDcsLTEuMDUyNjkgLTE0LjU2NzgsMC4xMDc5MiAtMTQuNTY3OCwwLjEwNzkyIGwgMC4zNzIxNiw0MS4xNDU3MyAtOTAuOTYyNTEsMC4xOTA3MiAwLjU0MDgyLC00My45MTExNyBjIDAsMCAtOC44NDIwMywtMS44MTU5OSAtMTEuNDQ4MjMsMC4xNDYxMyB6IG0gNzQuNTM2MjYsNTAuMjI2OTIgYyAtMC4yMTY0Miw0LjE4NzUgMS4zMzA3OCw5LjA0ODEyIDAuNTM5MDYsMTAuNzM4MjggbCAtMzEuODA0NjgsMC4wOTU3IC0wLjM3ODkxLC0xMC40NTMxMyB6IgogICAgICAgICAgICAgaWQ9InBhdGgxNjU0LTItMCIKICAgICAgICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KC0wLjM0Nzk3MTUsMC4wMDY0NDY4MSwwLjAwNjQ0NjgxLDAuMzQ3OTcxNSwxOTUuMjEwMDQsNTEuNDg5MjE2KSIgLz4KICAgICAgICA8L2c+CiAgICAgICAgPGcKICAgICAgICAgICBpZD0iZzE4MjItOSIKICAgICAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjY3NDgyMjcyLDAuNzE1MjI2NzEpIiAvPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgaWQ9InBhdGgxNTI5LTktMy0zIgogICAgICAgICAgIGQ9Im0gMTQ1LjgxODA1LDE3Ni42Mjg3OCAtMC4wNzk4LDMuMjUyNTkgMC4zOTEsMTcuMzI1MjQgLTMwLjMwMTgzLDAuNjgzNzcgLTAuMjUxLC0xNy4zMjcxNSAwLjI1MDMyLDE3LjMyNzE2IC0wLjM4MDM2LC0xOS40Mjg5NCAtMC4wNzA5LC0xLjE0NTYyIDEuNTUwMzksMC4wMTYyIDI2LjMxODM3LC0wLjU4MDczIHoiCiAgICAgICAgICAgc3R5bGU9Im9wYWNpdHk6MTt2ZWN0b3ItZWZmZWN0Om5vbmU7ZmlsbDojNWJjYmY1O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjQzMDAzODlweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjEiIC8+CiAgICAgIDwvZz4KICAgICAgPGcKICAgICAgICAgaWQ9ImcxNjA0LTMxIgogICAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0wLjI3NTkzMTk2KSI+CiAgICAgICAgPGcKICAgICAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDAuMzk2ODc1MDMpIgogICAgICAgICAgIGlkPSJnMTU4MC0xMCIgLz4KICAgICAgPC9nPgogICAgICA8ZwogICAgICAgICBpZD0iZzE4NjMtOSI+CiAgICAgICAgPGcKICAgICAgICAgICBpZD0iZzE3ODQtNiI+CiAgICAgICAgICA8cGF0aAogICAgICAgICAgICAgc3R5bGU9Im9wYWNpdHk6MTt2ZWN0b3ItZWZmZWN0Om5vbmU7ZmlsbDojNWJjYmY1O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjIzNTYzMzEzcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICAgICAgZD0ibSAzODIuNjExNjIsMzczLjM0MTgyIDAuMDY5NCw0Mi45OTI0MiAtOTAuNTE4MjIsMC4wODIyIGMgMCwwIDAuNjI3MDksLTM0LjU1MTA5IDAuNDcxMjgsLTQwLjc2MDIyIC00LjgxMDY0LC05LjhlLTQgLTcuOTk3NjcsMC4wNDA4IC0xMi44MDU5MiwtMC4xMzQ3NyAxLjU2NTkzLDQ1Ljg1NDc0IDEuMjUwNTUsMTM3LjYxNTI0IDEuMjUwNTUsMTM3LjYxNTI0IGwgMTEuNjgzODYsLTAuMjg2MiAwLjE2NDYzLC0zMS4wNTcyNCAzMC4xNTA5NiwtMS4xOTA1NyB2IC0zMi44NjA1MiBsIDMzLjU5NzY2LDEuNjA5NCAxLjYwOTQsMzMuNDc2ODYgMjYuNDMxNjQsMS4xNDUzMSAtMC42ODk3NSwyOC42OTAzMyAxMS4xNTM1NSwtMC4xNTY5IC0wLjczODQsLTEzOS41NTE1NSB6IG0gLTI3LjQyNDEyLDQ5LjU4MDA2IDAuNTcwMzEsOS42OTMzNSBjIC0xMS4xMDE4OCwxLjk3NzYxIC0yMS40ODIyOSwxLjEwNzQxIC0zMS44MzU5MywxLjE0MDYzIGwgLTAuMzc4OTEsLTEwLjQ1MzEzIHoiCiAgICAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjM0ODAzMTIxLDAsMCwwLjM0ODAzMTIxLDEyLjY2NTk1Niw1Mi42OTcyMjQpIgogICAgICAgICAgICAgaWQ9InBhdGgxNjU0LTI2IiAvPgogICAgICAgIDwvZz4KICAgICAgICA8ZwogICAgICAgICAgIGlkPSJnMTYwNC0zLTYiCiAgICAgICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTAuNDUzNTI0LDAuMTg3MDg4OTYpIj4KICAgICAgICAgIDxnCiAgICAgICAgICAgICBpZD0iZzE1ODAtMS05IgogICAgICAgICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwwLjM5Njg3NTAzKSI+CiAgICAgICAgICAgIDxwYXRoCiAgICAgICAgICAgICAgIGlkPSJwYXRoMTUyOS05LTMiCiAgICAgICAgICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuMzQ4MDMxMjEsMCwwLDAuMzQ4MDMxMjEsLTM3Ljc4NzU2OCw1Mi4xMTMyNikiCiAgICAgICAgICAgICAgIGQ9Im0gMjkzLjc2NTYyLDM1NS42Mjg5MSAwLjQwMjM1LDkuMzM5ODQgLTAuMjAxMTcsNDkuNzkyOTcgODcuMDg3ODksMC4zNTE1NiAtMC4yMDExNywtNDkuNzkxMDEgMC4yMDMxMiw0OS43OTEwMSAwLjA1ODYsLTU1LjgzNTk0IDAuMTQyNTgsLTMuMjk0OTIgLTQuNDUzMTIsMC4xMjg5MSAtNzUuNjM4NjcsLTAuMjY3NTggeiIKICAgICAgICAgICAgICAgc3R5bGU9Im9wYWNpdHk6MTt2ZWN0b3ItZWZmZWN0Om5vbmU7ZmlsbDojNWJjYmY1O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjIzNTYzMzEzcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIiAvPgogICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgICAgICA8ZwogICAgICAgICAgIGlkPSJnMTYwNC0zLTYtNiIKICAgICAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MC44OTQwOTUsNDUuMzA5NTY1KSI+CiAgICAgICAgICA8ZwogICAgICAgICAgICAgaWQ9ImcxNTgwLTEtOS03IgogICAgICAgICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwwLjM5Njg3NTAzKSI+CiAgICAgICAgICAgIDxwYXRoCiAgICAgICAgICAgICAgIGlkPSJwYXRoMTUyOS05LTMtNSIKICAgICAgICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMC4zNDgwMzEyMSwwLDAsMC4zNDgwMzEyMSwtMzcuNzg3NTY4LDUyLjExMzI2KSIKICAgICAgICAgICAgICAgZD0ibSAyOTMuNzY1NjIsMzU1LjYyODkxIDAuNDAyMzUsOS4zMzk4NCAtMC4yMDExNyw0OS43OTI5NyA4Ny4wODc4OSwwLjM1MTU2IC0wLjIwMTE3LC00OS43OTEwMSAwLjIwMzEyLDQ5Ljc5MTAxIDAuMDU4NiwtNTUuODM1OTQgMC4xNDI1OCwtMy4yOTQ5MiAtNC40NTMxMiwwLjEyODkxIC03NS42Mzg2NywtMC4yNjc1OCB6IgogICAgICAgICAgICAgICBzdHlsZT0ib3BhY2l0eToxO3ZlY3Rvci1lZmZlY3Q6bm9uZTtmaWxsOiM1YmNiZjU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuMjM1NjMzMTNweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjEiIC8+CiAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgICA8L2c+CiAgICAgIDxnCiAgICAgICAgIGlkPSJnMTYwNC0zLTYtNi0zIgogICAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjM0MzI4ODM3LDQ0LjE4OTMyNikiPgogICAgICAgIDxnCiAgICAgICAgICAgaWQ9ImcxNTgwLTEtOS03LTUiCiAgICAgICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwwLjM5Njg3NTAzKSI+CiAgICAgICAgICA8cGF0aAogICAgICAgICAgICAgaWQ9InBhdGgxNTI5LTktMy01LTYiCiAgICAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjM0ODAzMTIxLDAsMCwwLjM0ODAzMTIxLC0zNy43ODc1NjgsNTIuMTEzMjYpIgogICAgICAgICAgICAgZD0ibSAyOTMuNzY1NjIsMzU1LjYyODkxIDAuNDAyMzUsOS4zMzk4NCAtMC4yMDExNyw0OS43OTI5NyA4Ny4wODc4OSwwLjM1MTU2IC0wLjIwMTE3LC00OS43OTEwMSAwLjIwMzEyLDQ5Ljc5MTAxIDAuMDU4NiwtNTUuODM1OTQgMC4xNDI1OCwtMy4yOTQ5MiAtNC40NTMxMiwwLjEyODkxIC03NS42Mzg2NywtMC4yNjc1OCB6IgogICAgICAgICAgICAgc3R5bGU9Im9wYWNpdHk6MTt2ZWN0b3ItZWZmZWN0Om5vbmU7ZmlsbDojNWJjYmY1O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjIzNTYzMzEzcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIiAvPgogICAgICAgIDwvZz4KICAgICAgPC9nPgogICAgPC9nPgogICAgPGcKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDEuNDg0MDYzLC0wLjI1NjMwNTAzLDAuMjU2MzA1MDMsMS40ODQwNjMsLTk2Ljg2ODQ1OCwtNTguMTY2MzI1KSIKICAgICAgIGlkPSJnMTMxOS04Ij4KICAgICAgPHBhdGgKICAgICAgICAgc3R5bGU9Im9wYWNpdHk6MTt2ZWN0b3ItZWZmZWN0Om5vbmU7ZmlsbDojZmZkNDJhO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjQzNjY1Mjc4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgZD0ibSA4NC45NDUzMTIsMjg1LjUwNTg2IGMgMCwwIC03LjIwODU1MiwwLjQ4ODY3IC05LjE1MjM0MywxMi4zMzM5OCAtNy41MzIxODMsNDUuOTAwNTEgLTM2LjU2MjUsMTU0LjA4MDA4IC0zNi41NjI1LDE1NC4wODAwOCBsIC0xMS45OTIxODgsLTAuOTI5NjkgLTE3LjkzNzQ5OTgsMTIuOTY2OCAtNi4wMTk1MzEyLDIzLjIxODc1IDE2LjI2MTcxOSwyMy44MDg2IDEuOTM3NSwwLjA1MDggMTEuMjE2Nzk3LDUuMTk5MjIgMi4xNDg0MzcsLTkuMzM5ODUgLTEwLjc0MjE4NywtNi45MTk5MiAtOS44NjkxNDEsLTE1LjI2NzU4IDMuODEyNSwtMTUuODk2NDggMTEuMzczMDQ3LC03Ljg0NTcxIDMxLjQ4NjMyOCwzLjYyNjk2IDcuMTEzMjgxLDguODAwNzggLTMuMzIyMjY1LDE3LjA2MjUgLTE2LjA2ODM2LDExLjkzNzUgLTEuODIwMzEyLDExLjc5MTAxIDEuNTMzMjAzLDAuNTA1ODYgMjYuMDI1MzkxLC0xOS4wNTY2NCA0LjY3MzgyOCwtMjMuNzU3ODEgLTEyLjQ2MDkzOCwtMTcuNDI1NzggMzEuNTE3NTc4LC0xMDYuNDU3MDMgNi44MjAzMTQsMC43OTg4MyAxNi45MzM1OSwtNC4yMTg3NSAtNS43NzczNCwtMzUuNDE2MDIgLTQuNjIzMDUsMC44NjUyMyAtNC43MDUwOCwtMjQuNDg0MzcgLTE0LjkwODE5OSwxLjYyMzA1IHoiCiAgICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuMzQyOTU0MTUsMC4wNTkyMjk4OCwtMC4wNTkyMjk4OCwwLjM0Mjk1NDE1LDM0LjI3ODYyLDQ2Ljg0NTgpIgogICAgICAgICBpZD0icGF0aDEzMDctMiIgLz4KICAgICAgPHBhdGgKICAgICAgICAgc3R5bGU9ImZpbGw6I2FhODgwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC4yNjQ1ODMzMnB4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgIGQ9Im0gMTYuMjA1NzI5LDIyMi43NTEzIC0yLjQxNDMyMywtNS4yNzUxMyAyLjQxNDMyMywtNS41MjMxOCA0LjA4NDUwNSwtMi4wODM1OSA4LjgxMzkzMiwyLjUzMDA4IC0xLjQ1NTIwOCwtMi42MTI3NiAtMTAuNTgzMzMzLC0zLjEwODg2IC00LjM2NTYyNSwyLjAxNzQ1IC0yLjI0ODk1OCw1LjIyNTUyIDIuNDgwNDY4LDUuODIwODQgeiIKICAgICAgICAgaWQ9InBhdGgxMzA5LTkiIC8+CiAgICAgIDxwYXRoCiAgICAgICAgIHN0eWxlPSJmaWxsOiNhYTg4MDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuMjY0NTgzMzJweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICBkPSJtIDIwLjM3MjkxNiwyMjYuMjIzOTYgMy44MTk5MjIsMi40NjM5MyA4LjgxMzkzMiwtNC44NDUxOCAyLjc0NTA1MiwtNy4xMjcyMiAtMy4yMjQ2MDksLTYuMzUgLTAuODU5ODk2LC0wLjc3NzIxIDEuNzY5NDAxLDMuNzcwMzEgLTMuMDA5NjM1LDcuODcxMzYgeiIKICAgICAgICAgaWQ9InBhdGgxMzExLTkiIC8+CiAgICA8L2c+CiAgICA8ZwogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoLTEuNDk0OTUsLTAuMTgyMzczMTMsLTAuMTgyMzczMTMsMS40OTQ5NSwyOTQuNzAyOTYsLTY1LjIyODY5MykiCiAgICAgICBpZD0iZzEzMTktNi03Ij4KICAgICAgPHBhdGgKICAgICAgICAgc3R5bGU9Im9wYWNpdHk6MTt2ZWN0b3ItZWZmZWN0Om5vbmU7ZmlsbDojZmZkNDJhO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjQzNjY1Mjc4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgZD0ibSA0NDIuMzU1NDcsMjgxLjcwMTE3IC02LjgwMDc4LDEuOTk2MSAtMTQuOTcwNzEsLTAuODgyODIgLTMuNDg2MzIsMjQuNjg5NDYgLTQuNjYwMTYsLTAuNjM2NzIgLTQuMDExNzIsMzUuNjU4MiAxNy4xMjExLDMuMzc1IDYuNzcxNDgsLTEuMTM2NzIgMzYuNzU5NzYsMTA0Ljc2MzY3IC0xMS41ODAwNywxOC4wMjE0OSA1Ljg0NTcsMjMuNDk2MDkgMjYuOTM3NSwxNy43NDIxOSAxLjUwNzgxLC0wLjU4MjAzIC0yLjQwNDI5LC0xMS42ODU1NSAtMTYuNjQwNjMsLTExLjEyMzA1IC00LjE2NDA2LC0xNi44Nzg5IDYuNjY3OTcsLTkuMTQyNTggMzEuMjY3NTcsLTUuMTg1NTUgMTEuNzUsNy4yNzM0NCA0LjU5NTcxLDE1LjY4NzUgLTkuMDk5NjEsMTUuNzM4MjggLTEwLjM4NjcyLDcuNDQ1MzEgMi42MDkzOCw5LjIyMDcxIDEwLjk0MzM1LC01Ljc1IDEuOTMzNiwtMC4xNDY0OSAxNS4wNjA1NSwtMjQuNTgzOTggLTcuMTYyMTEsLTIyLjg5MjU4IC0xOC41NjA1NSwtMTIuMDYwNTUgLTExLjkyOTY5LDEuNTIzNDQgYyAwLDAgLTM0LjM2MDM3LC0xMDYuNjA3NzUgLTQ0LjE2MDE1LC0xNTIuMDc4MTIgLTIuNTI4OTksLTExLjczNDMyIC05Ljc1MzkxLC0xMS44NjUyNCAtOS43NTM5MSwtMTEuODY1MjQgeiIKICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoLTAuMzQ1NDcwMDEsLTAuMDQyMTQ0ODUsLTAuMDQyMTQ0ODUsMC4zNDU0NzAwMSwyMTEuMTkzMjUsNzEuMTE1ODc1KSIKICAgICAgICAgaWQ9InBhdGgxMzA3LTAtNjEiIC8+CiAgICAgIDxwYXRoCiAgICAgICAgIHN0eWxlPSJmaWxsOiNhYTg4MDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuMjY0NTgzMzJweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICBkPSJtIDE2LjIwNTcyOSwyMjIuNzUxMyAtMi40MTQzMjMsLTUuMjc1MTMgMi40MTQzMjMsLTUuNTIzMTggNC4wODQ1MDUsLTIuMDgzNTkgOC44MTM5MzIsMi41MzAwOCAtMS40NTUyMDgsLTIuNjEyNzYgLTEwLjU4MzMzMywtMy4xMDg4NiAtNC4zNjU2MjUsMi4wMTc0NSAtMi4yNDg5NTgsNS4yMjU1MiAyLjQ4MDQ2OCw1LjgyMDg0IHoiCiAgICAgICAgIGlkPSJwYXRoMTMwOS02LTMiIC8+CiAgICAgIDxwYXRoCiAgICAgICAgIHN0eWxlPSJmaWxsOiNhYTg4MDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuMjY0NTgzMzJweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICBkPSJtIDIwLjM3MjkxNiwyMjYuMjIzOTYgMy44MTk5MjIsMi40NjM5MyA4LjgxMzkzMiwtNC44NDUxOCAyLjc0NTA1MiwtNy4xMjcyMiAtMy4yMjQ2MDksLTYuMzUgLTAuODU5ODk2LC0wLjc3NzIxIDEuNzY5NDAxLDMuNzcwMzEgLTMuMDA5NjM1LDcuODcxMzYgeiIKICAgICAgICAgaWQ9InBhdGgxMzExLTItMiIgLz4KICAgIDwvZz4KICAgIDxnCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgxLjUwNjAzMywwLDAsMS41MDYwMzMsLTUzLjA2NTM2LC03NS4yMTU5ODUpIgogICAgICAgaWQ9ImcxMzA1LTkiPgogICAgICA8ZwogICAgICAgICBpZD0iZzEyNjAtOSI+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBzdHlsZT0ib3BhY2l0eToxO3ZlY3Rvci1lZmZlY3Q6bm9uZTtmaWxsOiNmZmQ0MmE7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuNDk5ODY4NDU7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICAgIGQ9Im0gMTU4LjE2MDA4LDExNC4zMDc5MSBjIDQuNTY0MDYsLTEuMzg1MTYgNC41NTQ1Myw0Ljk0OTAyIDQuNTQ1MTIsNy45MDY5NyAwLjQ2MjAyLDcuOTk4MTIgMC4wMzUxLDE2LjA3MjgxIC0xLjAwNzQ2LDIzLjk5MTk0IC0yLjI4NjA5LDUuMTcwOCAtNi4wNDA4LC0wLjQwNzcyIC00LjI0NDA4LC0zLjg1MzU2IDAuMTQ5NjksLTkuMzM1MDQgMC40ODY1LC0xOC42OTgzMSAwLjcwNjQyLC0yOC4wNDUzNSB6IgogICAgICAgICAgIGlkPSJwYXRoMTI1NC0xIiAvPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgc3R5bGU9Im9wYWNpdHk6MTt2ZWN0b3ItZWZmZWN0Om5vbmU7ZmlsbDojZmZkNDJhO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjU7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICAgIGQ9Im0gMTU0LjQ1MDUyLDE3NS4yMDg3OCBjIDIuNjA5NjQsMi41ODAxIDYuNTU0ODgsMC4yNTI5MSA2LjMxODc4LC0zLjE3NDk4IDEuMjMxODQsLTYuMDgyMTkgMS4zMzM4MiwtMTIuMzM1MDEgMS4xOTUxOSwtMTguNTIzNTUgMC41Mzg5MiwtMy4yMDAxOSAtMS45NTk4OSwtOC40MTEzNSAtNS40NjI1OCwtNC45OTA0MiAtMC45OTM0OCwzLjk1OTU5IC0wLjM0ODg2LDguNTg2OTUgLTEuMDk2MTgsMTIuODE0MjcgLTAuMjY1MDQsNC42Mjc5NyAtMC42NDQxNiw5LjI0OTQyIC0wLjk1NTIxLDEzLjg3NDY4IHoiCiAgICAgICAgICAgaWQ9InBhdGgxMjU2LTQiIC8+CiAgICAgIDwvZz4KICAgICAgPGcKICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoLTEsMCwwLDEsMjEwLjExMzk1LDAuMTI2OTMyMDEpIgogICAgICAgICBpZD0iZzEyNjAtMC05Ij4KICAgICAgICA8cGF0aAogICAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmQ0MmE7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuNTtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICAgIGQ9Im0gMTU4LjE2MDA4LDExNC4zMDc5MSBjIDYuMjc2NDYsLTAuMjUxOTEgNC4xMTcxLDguMTQxODkgNC43MDkwNSwxMi4yMDA5NiAwLjEyNTQ0LDYuNTgzNyAtMC4zMTI5NSwxMy4xNzE1MSAtMS4xNzEzOCwxOS42OTc5NSAtMy4zNDU5NCw1LjQ5NDI2IC02LjIzMjg3LC0zLjUzNzIzIC00LjE5ODMyLC02LjQyNzIyIDAuMTY1MDcsLTguNDkxOTMgMC40NjA5MiwtMTYuOTgwNiAwLjY2MDY1LC0yNS40NzE2OSB6IgogICAgICAgICAgIGlkPSJwYXRoMTI1NC05LTEiIC8+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBzdHlsZT0ib3BhY2l0eToxO3ZlY3Rvci1lZmZlY3Q6bm9uZTtmaWxsOiNmZmQ0MmE7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuNTtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgICAgZD0ibSAxNTQuMjQwMDUsMTc1LjQxOTI2IGMgMS41Mjc1MSwxLjQ4MjI0IDQuMTExMjIsMS4wNjY4NCA1LjQwODIzLC0wLjUwOTMxIDEuMzE5MjUsLTEuMzc2NzkgMS45NjY0MiwtMy4zODU1MSAxLjY0MTc5LC01LjI3MDYxIDAuNjE0MjEsLTYuNzI2NTMgMS4xODcxOSwtMTMuNTMyOTcgMC4yNzI2MSwtMjAuMjYwNTcgLTAuODAzOTksLTEuODE5MDMgLTMuNDI5NzEsLTIuMTkzMDMgLTQuNzYzMzEsLTAuNzM2NDUgLTEuOTM3NzQsMS42ODI0OSAtMC41MDE3Nyw0LjE4NDQ4IC0wLjk3ODU0LDYuMzA4NzkgLTAuMzg0OTcsNi44MzMyNSAtMS4xMzUyLDEzLjYzOTI1IC0xLjU4MDc4LDIwLjQ2ODE1IHoiCiAgICAgICAgICAgaWQ9InBhdGgxMjU2LTMtMCIgLz4KICAgICAgPC9nPgogICAgICA8cGF0aAogICAgICAgICBzdHlsZT0ib3BhY2l0eToxO3ZlY3Rvci1lZmZlY3Q6bm9uZTtmaWxsOiM1YmNiZjU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuNDMwMDM4OXB4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgZD0ibSAxMDQuNDc1NzMsMTAzLjY4MDQ5IGMgMTguMjkyNzQsMC4wMjQ0IDU0Ljg4MjgsLTMuMzI4MzQgNTQuNDYxODUsNy42MzEyMyAtMC40MjA5NSwxMC45NTk1NiAtMS41MDU1Myw1OS40NDU2NiAtMS41ODkzNyw2MS4yNzY2OCAtMC4wODM4LDEuODMxMDIgLTAuMDQyOSwzLjM2NTE5IC0xLjczNjQsMy40OTAzNiAtMS42OTM0NiwwLjEyNTE3IC05NS43NDIzMDcsMC4wMTQ1IC05OS4zMTM5NzksMC4yMzI0OCAtMy41NzE2NzIsMC4yMTgwMiAtMy43MDQxODQsLTEuOTkzMzQgLTMuODUyNzc5LC0zLjM4OTc2IC0wLjE0ODU5NSwtMS4zOTY0MiAtMC43OTU2MzgsLTU1Ljg5Mjk0IC0wLjYwOTQxNSwtNjMuMDc1MzQgMC4yMTkwNDksLTguNDQ4NDYgMzQuMzQ3MzU5LC02LjE5MDA1IDUyLjY0MDA5MywtNi4xNjU2NSB6IgogICAgICAgICBpZD0icmVjdDEyMzYtNyIgLz4KICAgICAgPHBhdGgKICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC41O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgIGQ9Im0gMTA0Ljc5MTU0LDE1MC4yMDU4NiA2Ljc4NDgsMy45MTcyMSB2IDcuNDI2OCBsIC02LjcwMDc0LDMuODY4NjggLTYuNTg5OTg2LC0zLjgwNDczIHYgLTcuNzUzNCB6IgogICAgICAgICBpZD0icGF0aDExNzYtNSIgLz4KICAgIDwvZz4KICAgIDxnCiAgICAgICBpZD0iZzEyNTIiCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgxLjUwMzA3MDYsMCwwLDEuNTAzMDcwNiwtNTIuOTE3NzY3LC03NC4zMTExODQpIj4KICAgICAgPGcKICAgICAgICAgc3R5bGU9InN0cm9rZTojMDAwMDAwO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgIGlkPSJnMTExMSI+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBzdHlsZT0ib3BhY2l0eToxO3ZlY3Rvci1lZmZlY3Q6bm9uZTtmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuNTtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgICAgZD0ibSA4MS44NzgyMDYsMTA0LjA2NTU0IGMgLTUuOTU4MTYsLTAuMDEyMiAtMTEuODQ2NzQsMi40ODU5OSAtMTYuMDI2NDEzLDYuNzIzNjIgLTIuMjAxNjUxLC0xLjk2OTkyIC00LjMxNzkwNywtNC4wNTExNCAtNi42Njc4MDksLTUuODQ0NjEgLTEuNzc0NjM3LC0wLjEzMjY5IC01LjE2ODc1NywxLjg1MjM5IC0yLjI2MDc0NiwyLjk4NDAzIDIuMzgzMjcyLDEuNjc3MzggNC41NjEwMTcsMy42Njg4OCA2LjI2NDYzNSw2LjA0NDM2IC02LjE0MTI1Nyw4LjUyMzc4IC01Ljc2NDUyNywyMC45OTc0NyAwLjgzNTA2MiwyOS4xNTM2IDUuMTg5NTUxLDYuNzM1NTQgMTQuMzE0NzI1LDEwLjE4NTIxIDIyLjYzOTg0Miw4LjI2ODk0IDkuMzU2MDY3LC0xLjkwNzQ2IDE2LjczOTE4MywtMTAuMjA5NjIgMTguMDgwOTgzLC0xOS41ODMyNSAxLjYwNTQ1LC05LjYwMzIgLTMuMDgxMjUsLTIwLjAwNDEzIC0xMS42NTgyMDksLTI0Ljc3MjE4IC0zLjM5MTY0MywtMS45NDcyNyAtNy4yOTQ2MSwtMi45OTQxMyAtMTEuMjA3MzQ1LC0yLjk3NDUxIHoiCiAgICAgICAgICAgaWQ9InBhdGgxMDYzLTIiIC8+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjI2NDU4MzMycHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgICBkPSJtIDU1LjUxMjQ4LDEwNi44NDI5MSBjIC0wLjg1OTc5NywtMC42NzUyMyAtMi45MjEyMTcsLTIuMzQ1MDcgLTMuNTk4OTY0LC0zLjEzNjgzIDAuNzQxNDEsLTAuNTA3OTggMjMuMTU4MjU0LC0xMC4zOTk0MjcgMzAuMjM0ODcyLC0xNC4zMzcxNyAwLjczMjg0OSwwLjYzNDIzIDEuNDU3OTYyLDEuOTY1MjEgMi4wNjQ3MzUsMy4yNjU4NjcgLTYuMTA3MDMsMy45MTM0MTcgLTI1LjY2ODk3NywxMi4wMjI2OTMgLTI1LjAyODg5NywxMi4zMDk5NDMgLTIuMzYyNjM2LDEuMjE5NDEgLTEuNTUyNjczLDAuNjgwMjIgLTMuNjcxNzQ2LDEuODk4MTkgeiIKICAgICAgICAgICBpZD0icGF0aDEwNjMtMyIgLz4KICAgICAgICA8ZwogICAgICAgICAgIHN0eWxlPSJzdHJva2U6IzAwMDAwMDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xLjA5MzQ3NzUsLTAuMjU2NSkiCiAgICAgICAgICAgaWQ9ImcxMTc0Ij4KICAgICAgICAgIDxwYXRoCiAgICAgICAgICAgICBzdHlsZT0ib3BhY2l0eToxO3ZlY3Rvci1lZmZlY3Q6bm9uZTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuMTU5NzAwM3B4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgICAgIGQ9Im0gODkuNTI3MjYxLDExOS4yOTkyMiBhIDUuMzIzNjE0LDUuMzIzNjE0IDAgMCAxIC01LjMyMzYxLDUuMzIzNjEgNS4zMjM2MTQsNS4zMjM2MTQgMCAwIDEgLTUuMzIzNjIsLTUuMzIzNjEgNS4zMjM2MTQsNS4zMjM2MTQgMCAwIDEgNS4zMjM2MiwtNS4zMjM2MiA1LjMyMzYxNCw1LjMyMzYxNCAwIDAgMSA1LjMyMzYxLDUuMzIzNjIgeiIKICAgICAgICAgICAgIGlkPSJwYXRoMTA0Ni03LTYtNiIgLz4KICAgICAgICA8L2c+CiAgICAgIDwvZz4KICAgICAgPGcKICAgICAgICAgc3R5bGU9InN0cm9rZTojMDAwMDAwO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgIGlkPSJnMTEwNiIKICAgICAgICAgdHJhbnNmb3JtPSJyb3RhdGUoOS42NzkyNzY3LDEyNy41OTU3NSwxMzEuMTA2MDcpIj4KICAgICAgICA8cGF0aAogICAgICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7dmVjdG9yLWVmZmVjdDpub25lO2ZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC41O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgICBkPSJtIDE0NC40NDEzMSw5OS43MzQwMTcgYyAtMS45MDA4MSwyLjI5Mjg2MyAtMy41MDk0OSw0LjgxMzQ5MyAtNS4yMjU1Miw3LjI0NTU1MyAtNy44OTUwMywtNC42Mjc3NiAtMTguNTI1ODcsLTMuNjEzNDggLTI1LjQ3MzUyLDIuMzA2ODIgLTcuNDAwNTEsNS45OTk4MyAtMTAuNDcyMzksMTYuNTY2NzYgLTcuNzA1MjUsMjUuNjQ1ODUgMi40OTcyNSw4Ljk5NTAzIDEwLjc1NjM2LDE2LjE2MTkyIDIwLjEzMzU0LDE2Ljg4NTkgOC41NTIwMywwLjg1ODAyIDE3LjIxNjMyLC0zLjczODg5IDIxLjU2MTYxLC0xMS4xMDQ1IDUuNDU1MDYsLTguNzI5NDQgNC41MTc1NiwtMjAuODc2NyAtMi4yOTExMiwtMjguNjE1MzQgLTEuMDQwOTksLTEuNTg1MTIgLTMuOTMyMjksLTIuNTUwNCAtMi4wNDI4NywtNC42MjA5OCAxLjA4NjMzLC0yLjY5Njc4IDMuMzgwNDQsLTQuNTcyNDEgNC45NzAwMSwtNi45MjYzNCAtMS4yMjQzNiwtMC41MTI3MSAtMi42ODcxMiwtMC4yMjUyMSAtMy45MjY4OCwtMC44MTY5NjMgeiIKICAgICAgICAgICBpZD0icGF0aDEwMTItMyIgLz4KICAgICAgICA8cGF0aAogICAgICAgICAgIGlkPSJwYXRoMTA0Ni03LTUiCiAgICAgICAgICAgZD0ibSAxMzIuMjU1NjIsMTE5LjA0MjcyIGEgNS4zMjM2MTQxLDUuMzIzNjE0MSAwIDAgMSAtNS4zMjM2MSw1LjMyMzYxIDUuMzIzNjE0MSw1LjMyMzYxNDEgMCAwIDEgLTUuMzIzNjIsLTUuMzIzNjEgNS4zMjM2MTQxLDUuMzIzNjE0MSAwIDAgMSA1LjMyMzYyLC01LjMyMzYyIDUuMzIzNjE0MSw1LjMyMzYxNDEgMCAwIDEgNS4zMjM2MSw1LjMyMzYyIHoiCiAgICAgICAgICAgc3R5bGU9Im9wYWNpdHk6MTt2ZWN0b3ItZWZmZWN0Om5vbmU7ZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjE1OTcwMDNweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjEiIC8+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjI2NDU4MzMycHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgICBkPSJtIDE0OC4zNjgzOCwxMDAuNTUwODEgYyAxLjg0ODU2LC0xLjczNDI1OCAyLjMwNzczLC0zLjI2MjQ0NSAyLjMwNzczLC0zLjI2MjQ0NSAtMi4wNTIyNCwtMC42ODY2MjkgLTE5LjA1MTg2LC01LjIzNzM0NyAtMzAuMjk4OTgsLTguODUwNzg2IC0wLjc2MDQ5LDAuNTk4NjU0IC0xLjU4Mzc4LDMuMTk5OTU5IC0xLjg4NDE1LDMuODY2NzMxIDguMDQ2MywzLjgwMTEzNSAyNS44ODU4NCw3Ljg0Mjc4IDI5Ljg3NTQsOC4yNDY1IHoiCiAgICAgICAgICAgaWQ9InBhdGgxMDYzLTUtNiIgLz4KICAgICAgPC9nPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==';


const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const nets = require('nets');
const languageNames = require('scratch-translate-extension-languages');
const formatMessage = require('format-message');
const Marty = require('./marty');


/**
 * The url of the translate server.
 * @type {string}
 */
const serverURL = 'https://translate-service.scratch.mit.edu/';

/**
 * How long to wait in ms before timing out requests to translate server.
 * @type {int}
 */
const serverTimeoutMs = 10000; // 10 seconds (chosen arbitrarily).




/**
 * Class for the translate block in Scratch 3.0.
 * @constructor
 */
class Scratch3MartyBlocks {

    
    /**
     * The ID of the extension.
     * @return {string} the id
     */
    static get EXTENSION_ID () {
        return 'marty';
    }

    
    constructor (runtime, extensionId) {

        /**
         * Holder for Marty instance
         * @type {object}
         * @private
         */
        this._marty = null;        

        /**
         * The Scratch 3.0 runtime used to trigger the green flag button.
         * @type {Runtime}
         * @private
         */
        this._runtime = runtime;

        /**
         * The BluetoothLowEnergy connection socket for reading/writing peripheral data.
         * @type {BLE}
         * @private
         */
        this._runtime.registerPeripheralExtension(extensionId, this);

        /**
         * Language code of the viewer, based on their locale.
         * @type {string}
         * @private
         */
        this._viewerLanguageCode = this.getViewerLanguageCode();

        /**
         * List of supported language name and language code pairs, for use in the block menu.
         * @type {Array.<object.<string, string>>}
         * @private
         */
        this._supportedLanguages = languageNames.menuMap[this._viewerLanguageCode].map(entry => {
            const obj = {text: entry.name, value: entry.code};
            return obj;
        });

        /**
         * A randomly selected language code, for use as the default value in the language menu.
         * @type {string}
         * @private
         */
        this._randomLanguageCode = this._supportedLanguages[
            Math.floor(Math.random() * this._supportedLanguages.length)].value;

        /**
         * The result from the most recent translation.
         * @type {string}
         * @private
         */
        this._translateResult = '';

        /**
         * The language of the text most recently translated.
         * @type {string}
         * @private
         */
        this._lastLangTranslated = '';

        /**
         * The text most recently translated.
         * @type {string}
         * @private
         */
        this._lastTextTranslated = '';
    }

    /**
     * The key to load & store a target's translate state.
     * @return {string} The key.
     */
    static get STATE_KEY () {
        return 'Scratch.marty';
    }

    /**
     * Called by the runtime when user wants to scan for a peripheral.
     */
    scan () {
        this._marty = "Hello, World";
        console.warn("Marty scratch blocks Scan hit");
    }

    /**
     * Called by the runtime when user wants to connect to a certain peripheral.
     * @param {number} id - the id of the peripheral to connect to.
     */
    connect (id) {
        console.warn(id);
        console.warn("Marty scratch blocks Connect hit");
    }
    

    /**
     * Disconnect from Marty.
     */
    disconnect () {
        console.warn("Marty scratch blocks Disconnect hit");
    }

    /**
     * Return true if connected to the micro:bit.
     * @return {boolean} - whether the micro:bit is connected.
     */
    isConnected () {
        console.warn("Marty scratch blocks isConnected hit");
        return true;
    }

    
    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'marty',
            name: formatMessage({
                id: 'marty.categoryName',
                default: 'Marty the Robot',
                description: 'Name of extension that adds Marty the Robot blocks'
            }),
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
                {
                    opcode: 'getTranslate',
                    text: formatMessage({
                        id: 'marty.translateBlock',
                        default: 'martyfy [WORDS] to [LANGUAGE]',
                        description: 'translate some text to a different language'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        WORDS: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'marty.defaultTextToTranslate',
                                default: 'hello',
                                description: 'hello: the default text to translate'
                            })
                        },
                        LANGUAGE: {
                            type: ArgumentType.STRING,
                            menu: 'languages',
                            defaultValue: this._randomLanguageCode
                        }
                    }
                },
                {
                    opcode: 'getViewerLanguage',
                    text: formatMessage({
                        id: 'marty.viewerLanguage',
                        default: 'language',
                        description: 'the languge of the project viewer'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {}
                }
            ],
            menus: {
                languages: this._supportedLanguages
            }
        };
    }

    /**
     * Get the human readable language value for the reporter block.
     * @return {string} the language name of the project viewer.
     */
    getViewerLanguage () {
        this._viewerLanguageCode = this.getViewerLanguageCode();
        const names = languageNames.menuMap[this._viewerLanguageCode];
        const langNameObj = names.find(obj => obj.code === this._viewerLanguageCode);
        let langName = this._viewerLanguageCode;
        if (langNameObj) {
            langName = langNameObj.name;
        }
        return langName;
    }

    /**
     * Get the viewer's language code.
     * @return {string} the language code.
     */
    getViewerLanguageCode () {
        const locale = formatMessage.setup().locale;
        const viewerLanguages = [locale].concat(navigator.languages);
        const languageKeys = Object.keys(languageNames.menuMap);
        // Return the first entry in viewerLanguages that matches
        // one of the available language keys.
        const languageCode = viewerLanguages.reduce((acc, lang) => {
            if (acc) {
                return acc;
            }
            if (languageKeys.indexOf(lang) > -1) {
                return lang;
            }
            return acc;
        }, '') || 'en';
        return languageCode;
    }

    /**
     * Get a language code from a block argument. The arg can be a language code
     * or a language name, written in any language.
     * @param  {object} arg A block argument.
     * @return {string} A language code.
     */
    getLanguageCodeFromArg (arg) {
        const languageArg = Cast.toString(arg).toLowerCase();
        // Check if the arg matches a language code in the menu.
        if (languageNames.menuMap.hasOwnProperty(languageArg)) {
            return languageArg;
        }
        // Check for a dropped-in language name, and convert to a language code.
        if (languageNames.nameMap.hasOwnProperty(languageArg)) {
            return languageNames.nameMap[languageArg];
        }
        // Default to English.
        return 'en';
    }

    /**
     * Translates the text in the translate block to the language specified in the menu.
     * @param {object} args - the block arguments.
     * @return {Promise} - a promise that resolves after the response from the translate server.
     */
    getTranslate (args) {
        // Don't remake the request if we already have the value.
        if (this._lastTextTranslated === args.WORDS &&
            this._lastLangTranslated === args.LANGUAGE) {
            return this._translateResult;
        }

        const lang = this.getLanguageCodeFromArg(args.LANGUAGE);

        let urlBase = `${serverURL}translate?language=`;
        urlBase += lang;
        urlBase += '&text=';
        urlBase += encodeURIComponent(args.WORDS);

        const tempThis = this;
        const translatePromise = new Promise(resolve => {
            nets({
                url: urlBase,
                timeout: serverTimeoutMs
            }, (err, res, body) => {
                if (err) {
                    log.warn(`error fetching translate result! ${res}`);
                    resolve('');
                    return '';
                }
                const translated = JSON.parse(body).result;
                tempThis._translateResult = translated;
                // Cache what we just translated so we don't keep making the
                // same call over and over.
                tempThis._lastTextTranslated = args.WORDS;
                tempThis._lastLangTranslated = args.LANGUAGE;
                resolve(translated);
                return translated;
            });

        });
        translatePromise.then(translatedText => translatedText);
        return translatePromise;
    }
}
module.exports = Scratch3MartyBlocks;
