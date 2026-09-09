import { useRef, useState } from 'react'
import logo from './assets/logo.png'
import './App.css'

const colors = {
  cream: '#F7F4EE',
  black: '#292624',
  secondaryText: '#5D5954',
  border: '#C9C3BA',
  pageBackground: '#E5E1DA',
  inputBackground: '#FFFFFF',
}

function Instruction({ number, children, last = false }) {
  return (
    <tr>
      <td
        style={{
          width: '58px',
          padding: last ? '3px 18px 0 0' : '3px 18px 27px 0',
          color: colors.cream,
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: '30px',
          fontWeight: '800',
          lineHeight: '1',
          verticalAlign: 'top',
          whiteSpace: 'nowrap',
        }}
      >
        {String(number).padStart(2, '0')}
      </td>

      <td
        style={{
          padding: last ? '2px 0 0' : '2px 0 27px',
          color: colors.cream,
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: '16px',
          lineHeight: '1.5',
          verticalAlign: 'top',
        }}
      >
        {children}
      </td>
    </tr>
  )
}

function App() {
  const emailRef = useRef(null)

  const [boxDescription, setBoxDescription] = useState('first box')
  const [boxName, setBoxName] = useState('A')
  const [guestPhoneDigits, setGuestPhoneDigits] = useState('XXX-XXXX')
  const [afterHoursPhone, setAfterHoursPhone] = useState('(XXX) XXX-XXXX')
  const [hotelPhone, setHotelPhone] = useState('(XXX) XXX-XXXX')
  const [copyStatus, setCopyStatus] = useState('COPY EMAIL')

  const lightInputStyle = {
    display: 'inline-block',
    height: '29px',
    padding: '2px 7px',
    border: `1px solid ${colors.black}`,
    borderRadius: '2px',
    backgroundColor: colors.inputBackground,
    color: colors.black,
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '16px',
    lineHeight: '23px',
    verticalAlign: 'middle',
    boxSizing: 'border-box',
  }

  const darkSectionInputStyle = {
    ...lightInputStyle,
    border: `1px solid ${colors.cream}`,
    backgroundColor: colors.inputBackground,
    color: colors.black,
  }

  const copyEmail = async () => {
    if (!emailRef.current) return

    const emailCopy = emailRef.current.cloneNode(true)

    /*
      Convert the editable boxes into normal text before copying.
      The replacement text inherits the color of its section.
    */
    emailCopy.querySelectorAll('[data-copy-value]').forEach((input) => {
      const replacement = document.createElement('span')

      replacement.textContent = input.value
      replacement.style.fontFamily = 'Arial, Helvetica, sans-serif'
      replacement.style.fontSize = 'inherit'
      replacement.style.color = 'inherit'
      replacement.style.fontWeight = 'inherit'

      input.replaceWith(replacement)
    })

    const html = emailCopy.outerHTML
    const plainText = emailCopy.innerText

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([html], {
              type: 'text/html',
            }),
            'text/plain': new Blob([plainText], {
              type: 'text/plain',
            }),
          }),
        ])
      } else {
        const temporaryContainer = document.createElement('div')

        temporaryContainer.style.position = 'fixed'
        temporaryContainer.style.left = '-9999px'
        temporaryContainer.style.top = '0'
        temporaryContainer.appendChild(emailCopy)

        document.body.appendChild(temporaryContainer)

        const range = document.createRange()
        range.selectNodeContents(temporaryContainer)

        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)

        document.execCommand('copy')

        selection.removeAllRanges()
        document.body.removeChild(temporaryContainer)
      }

      setCopyStatus('COPIED! PASTE INTO GMAIL')

      window.setTimeout(() => {
        setCopyStatus('COPY EMAIL')
      }, 2500)
    } catch (error) {
      console.error('Unable to copy email:', error)
      setCopyStatus('COPY FAILED—TRY AGAIN')

      window.setTimeout(() => {
        setCopyStatus('COPY EMAIL')
      }, 2500)
    }
  }

  return (
    <main
      style={{
        width: '100%',
        minHeight: '100vh',
        margin: '0',
        padding: '34px 16px 60px',
        backgroundColor: colors.pageBackground,
        fontFamily: 'Arial, Helvetica, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '650px',
          margin: '0 auto',
        }}
      >
        {/* Everything inside this div is copied into Gmail. */}
        <div
          ref={emailRef}
          style={{
            width: '100%',
            maxWidth: '650px',
            margin: '0 auto',
            backgroundColor: colors.cream,
            color: colors.black,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '16px',
            lineHeight: '1.55',
            textAlign: 'left',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '40px 48px 27px',
              backgroundColor: colors.cream,
              textAlign: 'center',
              boxSizing: 'border-box',
            }}
          >
            <img
              src={logo}
              alt="The Crescent Hotel"
              style={{
                display: 'block',
                width: '215px',
                maxWidth: '60%',
                height: 'auto',
                margin: '0 auto 30px',
              }}
            />

            <div
              style={{
                color: colors.black,
                fontSize: '12px',
                fontWeight: '700',
                lineHeight: '1.3',
                letterSpacing: '2.2px',
                textTransform: 'uppercase',
              }}
            >
              Important Arrival Update
            </div>
          </div>

 {/* Full-width divider */}
<div
  style={{
    width: '100%',
    height: '1px',
    margin: '0',
    backgroundColor: colors.border,
  }}
/>

{/* Introduction */}
<div
  style={{
    padding: '31px 48px',
    backgroundColor: colors.cream,
    boxSizing: 'border-box',
  }}
>
  <p style={{ margin: '0 0 22px' }}>Hello,</p>

  <p style={{ margin: '0' }}>
    You may have received an earlier automated email containing a PIN
    for your stay. Please disregard that PIN and use the following
    instructions instead:
  </p>
</div>

          {/* Full-width dark instruction section */}
          <div
            style={{
              width: '100%',
              margin: '0',
              padding: '36px 48px',
              backgroundColor: colors.black,
              color: colors.cream,
              boxSizing: 'border-box',
            }}
          >
            <table
              role="presentation"
              cellPadding="0"
              cellSpacing="0"
              width="100%"
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: colors.black,
                color: colors.cream,
                fontFamily: 'Arial, Helvetica, sans-serif',
              }}
            >
              <tbody>
                <Instruction number={1}>
                  Go to the lockboxes beside the hotel’s side entrance. This
                  entrance is on the opposite side of the building from the
                  store.
                </Instruction>

                <Instruction number={2}>
                  When facing the lockboxes, use the{' '}
                  <input
                    data-copy-value
                    type="text"
                    value={boxDescription}
                    onChange={(event) =>
                      setBoxDescription(event.target.value)
                    }
                    aria-label="Lockbox description"
                    style={{
                      ...darkSectionInputStyle,
                      width: '110px',
                    }}
                  />
                  , labeled{' '}
                  <input
                    data-copy-value
                    type="text"
                    value={boxName}
                    onChange={(event) => setBoxName(event.target.value)}
                    aria-label="Lockbox name"
                    style={{
                      ...darkSectionInputStyle,
                      width: '48px',
                      textAlign: 'center',
                    }}
                  />
                  .
                </Instruction>

                <Instruction number={3}>
                  Enter the last seven digits of the phone number used for your
                  reservation—the{' '}
                  <input
                    data-copy-value
                    type="text"
                    value={guestPhoneDigits}
                    onChange={(event) =>
                      setGuestPhoneDigits(event.target.value)
                    }
                    aria-label="Guest phone number digits"
                    style={{
                      ...darkSectionInputStyle,
                      width: '118px',
                    }}
                  />{' '}
                  portion.
                </Instruction>

                <Instruction number={4} last>
                  Press the unlock button.
                </Instruction>
              </tbody>
            </table>
          </div>

          {/* Closing message */}
          <div
            style={{
              padding: '34px 48px 43px',
              backgroundColor: colors.cream,
              color: colors.black,
              boxSizing: 'border-box',
            }}
          >
            <p style={{ margin: '0 0 24px' }}>
              You do not need to press anything to wake up the lockbox. Simply
              enter the seven digits and then press unlock.
            </p>

            <p style={{ margin: '0 0 24px' }}>
              If you have any questions, please stop by the store before it
              closes. For assistance after hours, please call{' '}
              <input
                data-copy-value
                type="text"
                value={afterHoursPhone}
                onChange={(event) => setAfterHoursPhone(event.target.value)}
                aria-label="After-hours phone number"
                style={{
                  ...lightInputStyle,
                  width: '174px',
                }}
              />
              .
            </p>

            <p style={{ margin: '0 0 25px' }}>
              We apologize for any confusion and look forward to welcoming you
              to the Crescent Hotel!
            </p>

            <p style={{ margin: '0' }}>
              Warmly,
              <br />
              <strong>The Crescent Hotel</strong>
            </p>
          </div>

          {/* Cream footer */}
          <div
            style={{
              padding: '29px 48px 33px',
              backgroundColor: colors.cream,
              color: colors.black,
              borderTop: `1px solid ${colors.border}`,
              boxSizing: 'border-box',
            }}
          >
            <table
              role="presentation"
              cellPadding="0"
              cellSpacing="0"
              width="100%"
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                color: colors.black,
                fontFamily: 'Arial, Helvetica, sans-serif',
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      width: '60%',
                      padding: '0',
                      color: colors.black,
                      verticalAlign: 'middle',
                    }}
                  >
                    <div
                      style={{
                        marginBottom: '13px',
                        color: colors.black,
                        fontSize: '15px',
                        lineHeight: '1.4',
                      }}
                    >
                      <strong
                        style={{
                          marginRight: '8px',
                          color: colors.black,
                        }}
                      >
                        Phone:
                      </strong>

                      <input
                        data-copy-value
                        type="text"
                        value={hotelPhone}
                        onChange={(event) => setHotelPhone(event.target.value)}
                        aria-label="Hotel phone number"
                        style={{
                          ...lightInputStyle,
                          width: '174px',
                        }}
                      />
                    </div>

                    <div
                      style={{
                        color: colors.secondaryText,
                        fontSize: '13px',
                        lineHeight: '1.55',
                      }}
                    >
                      15778 Main Street
                      <br />
                      Crescent Mills, CA 95934
                    </div>
                  </td>

                  <td
                    style={{
                      width: '40%',
                      padding: '0',
                      textAlign: 'right',
                      verticalAlign: 'middle',
                    }}
                  >
                    <img
                      src={logo}
                      alt="The Crescent Hotel"
                      style={{
                        display: 'inline-block',
                        width: '135px',
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* This button is not copied. */}
        <button
          type="button"
          onClick={copyEmail}
          style={{
            display: 'block',
            width: '100%',
            maxWidth: '270px',
            margin: '24px auto 0',
            padding: '13px 20px',
            border: 'none',
            borderRadius: '3px',
            backgroundColor: colors.black,
            color: colors.cream,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '15px',
            fontWeight: '700',
            lineHeight: '1.2',
            letterSpacing: '1px',
            cursor: 'pointer',
          }}
        >
          {copyStatus}
        </button>
      </div>
    </main>
  )
}

export default App