function BankAccountInfos({ text, value }) {
  return (
    <div className='infos'>
      <p className='infos-text'>{text}</p>
      <p className='infos-colon'>:</p>
      <p className='infos-value'>{value}€</p>
    </div>
  );
}

export default BankAccountInfos;
