function MountainsLogo({ style = '' }) {
  return (
    <div className={style !== '' ? `${style}` : `flex h-6 w-6 items-center justify-center`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        viewBox="0 0 256 256"
        className="fill-current"
      >
        <path d="M164,80a28,28,0,1,0-28-28A28,28,0,0,0,164,80Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,40Zm90.88,155.92-54.56-92.08A15.87,15.87,0,0,0,186.55,96h0a15.85,15.85,0,0,0-13.76,7.84L146.63,148l-44.84-76.1a16,16,0,0,0-27.58,0L1.11,195.94A8,8,0,0,0,8,208H248a8,8,0,0,0,6.88-12.08ZM88,80l23.57,40H64.43ZM22,192l33-56h66l18.74,31.8,0,0L154,192Zm150.57,0-16.66-28.28L186.55,112,234,192Z"></path>
      </svg>
    </div>
  )
}

export default MountainsLogo
