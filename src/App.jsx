import { useRef, useState } from 'react'
import logo from './assets/logo.png'
import './App.css'

const colors = {
  cream: '#F7F4EE',
  black: '#262624',
  mutedText: '#625E59',
  border: '#C9C6BF',
  pageBackground: '#E8E5DF',
  white: '#FFFFFF',
}

const roomNumbers = Array.from({ length: 10 }, (_, index) => index + 1)

function EmailInstruction({ number, children, last = false }) {
  return (
    <table
      role="presentation"
      cellPadding="0"
      cellSpacing="0"
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: last ? '0' : '27px',
      }}
    >
      <tbody>
        <tr>
          <td
            width="64"
            valign="top"
            style={{
              width: '64px',
              padding: '0 18px 0 0',
              color: colors.cream,
              fontSize: '34px',
              fontWeight: '900',
              lineHeight: '1',
              letterSpacing: '-1px',
            }}
          >
            {String(number).padStart(2, '0')}
          </td>

          <td
            valign="top"
            style={{
              padding: '0',
              color: colors.cream,
              fontSize: '16px',
              lineHeight: '1.55',
            }}
          >
            {children}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

function App() {
  const [guestName, setGuestName] = useState('')
  const [roomNumber, setRoomNumber] = useState('1')
  const [copyStatus, setCopyStatus] = useState('')
  const emailRef = useRef(null)

  const displayName = guestName.trim() || 'Guest'

  const copyEmailInsert = () => {
    if (!guestName.trim()) {
      setCopyStatus('Please enter the guest’s name first.')
      return
    }

    const emailElement = emailRef.current
    if (!emailElement) return

    const selection = window.getSelection()
    const range = document.createRange()

    range.selectNode(emailElement)
    selection.removeAllRanges()
    selection.addRange(range)

    const copied = document.execCommand('copy')
    selection.removeAllRanges()

    setCopyStatus(
      copied
        ? 'Copied! Paste it directly into the Gmail message.'
        : 'Copy did not work. Select the email preview and copy it manually.',
    )

    window.setTimeout(() => setCopyStatus(''), 4000)
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '30px 16px 60px',
        backgroundColor: colors.pageBackground,
        color: colors.black,
        fontFamily: 'Arial, Helvetica, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      {/* Staff-only controls. These are not included in the copied email. */}
      <section
        style={{
          width: '100%',
          maxWidth: '680px',
          margin: '0 auto 24px',
          padding: '24px',
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.white,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            marginBottom: '7px',
            fontSize: '12px',
            fontWeight: '900',
            letterSpacing: '1.8px',
            textTransform: 'uppercase',
          }}
        >
          Crescent Hotel Staff Tool
        </div>

        <h1
          style={{
            margin: '0 0 22px',
            fontSize: '27px',
            lineHeight: '1.15',
            letterSpacing: '-0.5px',
          }}
        >
          Guest Arrival Email Insert
        </h1>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            marginBottom: '18px',
          }}
        >
          <label
            style={{
              display: 'block',
              flex: '1 1 260px',
              fontSize: '13px',
              fontWeight: '800',
            }}
          >
            Guest’s first name
            <input
              type="text"
              value={guestName}
              onChange={(event) => setGuestName(event.target.value)}
              placeholder="Example: Taylor"
              autoComplete="off"
              style={{
                display: 'block',
                width: '100%',
                height: '46px',
                marginTop: '7px',
                padding: '0 13px',
                border: `1px solid ${colors.border}`,
                borderRadius: '0',
                backgroundColor: colors.white,
                color: colors.black,
                font: 'inherit',
                boxSizing: 'border-box',
              }}
            />
          </label>

          <label
            style={{
              display: 'block',
              flex: '1 1 130px',
              maxWidth: '150px',
              fontSize: '13px',
              fontWeight: '800',
            }}
          >
            Room number
            <select
              value={roomNumber}
              onChange={(event) => setRoomNumber(event.target.value)}
              style={{
                display: 'block',
                width: '100%',
                height: '46px',
                marginTop: '7px',
                padding: '0 13px',
                border: `1px solid ${colors.border}`,
                borderRadius: '0',
                backgroundColor: colors.white,
                color: colors.black,
                font: 'inherit',
                boxSizing: 'border-box',
              }}
            >
              {roomNumbers.map((number) => (
                <option key={number} value={number}>
                  Room {number}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="button"
          onClick={copyEmailInsert}
          style={{
            width: '100%',
            padding: '14px 20px',
            border: `1px solid ${colors.black}`,
            borderRadius: '0',
            backgroundColor: colors.black,
            color: colors.cream,
            fontSize: '13px',
            fontWeight: '900',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Copy Email Insert
        </button>

        {copyStatus && (
          <div
            role="status"
            style={{
              marginTop: '13px',
              color: colors.mutedText,
              fontSize: '13px',
              lineHeight: '1.4',
            }}
          >
            {copyStatus}
          </div>
        )}
      </section>

      {/* Only this section is copied into Gmail. */}
      <table
        ref={emailRef}
        role="presentation"
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          color: colors.black,
          fontFamily: 'Arial, Helvetica, sans-serif',
          textAlign: 'left',
        }}
      >
        <tbody>
          <tr>
            <td align="center" style={{ padding: '0 8px' }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '680px',
                  margin: '0 auto',
                  overflow: 'hidden',
                  border: `1px solid ${colors.border}`,
                  backgroundColor: 'transparent',
                  boxSizing: 'border-box',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    padding: '34px 42px 30px',
                    backgroundColor: 'transparent',
                    boxSizing: 'border-box',
                  }}
                >
                  <img
                    src={logo}
                    alt="The Crescent Hotel"
                    style={{
                      display: 'block',
                      width: '150px',
                      maxWidth: '44%',
                      height: 'auto',
                      margin: '0 auto 30px',
                    }}
                  />

                  <div
                    style={{
                      marginBottom: '13px',
                      color: colors.mutedText,
                      fontSize: '11px',
                      fontWeight: '900',
                      lineHeight: '1.3',
                      letterSpacing: '2px',
                      textAlign: 'center',
                      textTransform: 'uppercase',
                    }}
                  >
                    Your Crescent Hotel Arrival
                  </div>

                  <h2
                    style={{
                      margin: '0 0 18px',
                      color: colors.black,
                      fontSize: '31px',
                      fontWeight: '900',
                      lineHeight: '1.12',
                      letterSpacing: '-0.8px',
                      textAlign: 'center',
                    }}
                  >
                    Hello, {displayName}!
                  </h2>

                  <p
                    style={{
                      margin: '0',
                      color: colors.black,
                      fontSize: '16px',
                      lineHeight: '1.6',
                      textAlign: 'center',
                    }}
                  >
                    Your room assignment and hotel access instructions are
                    below.
                  </p>
                </div>

                <div
                  style={{
                    padding: '30px 42px 32px',
                    backgroundColor: colors.black,
                    color: colors.cream,
                    textAlign: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      marginBottom: '8px',
                      fontSize: '11px',
                      fontWeight: '900',
                      lineHeight: '1.3',
                      letterSpacing: '2.2px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Your Room + Matching Lockbox
                  </div>

                  <div
                    style={{
                      fontSize: '52px',
                      fontWeight: '900',
                      lineHeight: '1',
                      letterSpacing: '-1.5px',
                    }}
                  >
                    ROOM {roomNumber}
                  </div>
                </div>

                <div
                  style={{
                    padding: '38px 42px 42px',
                    backgroundColor: colors.black,
                    color: colors.cream,
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      marginBottom: '31px',
                      color: colors.cream,
                      fontSize: '12px',
                      fontWeight: '900',
                      lineHeight: '1.3',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Access Instructions
                  </div>

                  <EmailInstruction number={1}>
                    Go to the lockboxes beside the hotel’s side entrance, on the
                    opposite side of the building from the store.
                  </EmailInstruction>

                  <EmailInstruction number={2}>
                    Use lockbox <strong>{roomNumber}</strong>, which matches your
                    assigned room number.
                  </EmailInstruction>

                  <EmailInstruction number={3}>
                    Enter the last seven digits of the phone number used for your
                    reservation—the <strong>XXX-XXXX</strong> portion, minus the
                    dash. The first digit wakes up the lockbox and begins your
                    entry. You do not need to press another button first.
                  </EmailInstruction>

                  <EmailInstruction number={4}>
                    After entering your PIN, press the unlock button. If you have
                    trouble, press the unlock button to clear the lock, then
                    start over.
                  </EmailInstruction>

                  <EmailInstruction number={5} last>
                    Take the key card from the lockbox. It unlocks the hotel
                    entrance beside the lockboxes and your room. Once inside, go
                    upstairs to find Room <strong>{roomNumber}</strong>.
                  </EmailInstruction>
                </div>

                <div
                  style={{
                    padding: '34px 42px 38px',
                    backgroundColor: 'transparent',
                    color: colors.black,
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      marginBottom: '18px',
                      fontSize: '12px',
                      fontWeight: '900',
                      lineHeight: '1.3',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Need Help?
                  </div>

                  <p
                    style={{
                      margin: '0 0 12px',
                      color: colors.black,
                      fontSize: '16px',
                      lineHeight: '1.55',
                    }}
                  >
                    <strong>During store hours:</strong> Go inside The Crescent
                    Store.
                  </p>

                  <p
                    style={{
                      margin: '0 0 25px',
                      color: colors.black,
                      fontSize: '16px',
                      lineHeight: '1.55',
                    }}
                  >
                    <strong>After hours:</strong> Press the button on the Ring
                    camera beside the lockboxes.
                  </p>

                  <div style={{ textAlign: 'center' }}>
                    <a
                      href="tel:+15309958692"
                      style={{
                        display: 'inline-block',
                        padding: '14px 28px',
                        border: `1px solid ${colors.black}`,
                        backgroundColor: colors.black,
                        color: colors.cream,
                        fontSize: '13px',
                        fontWeight: '900',
                        lineHeight: '1.2',
                        letterSpacing: '1.5px',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                      }}
                    >
                      Questions? Call Us
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}

export default App