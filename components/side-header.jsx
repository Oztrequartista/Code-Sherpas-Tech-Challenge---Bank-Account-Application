const SideHeader = ({ title, paragraph, extra = null, headerClassName="",  paragraphClassName="" }) => {
  return (
    <div className="mb-4">
      <h3 className={`mb-1 text-body_base_normal ${headerClassName}`}>{title}</h3>
      <p className={`text-neutral-400 text-body_sm1_normal lg:w-70 ${paragraphClassName}`}>
        {paragraph}
      </p>
      {extra}
    </div>
  );
};


export default SideHeader;