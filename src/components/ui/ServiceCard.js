// ServiceCard Component
const ServiceCard = ({ service, onClick, isSelected }) => {
  return (
    <div 
      className={`bg-white rounded-lg p-4 md:p-6 shadow-sm transition-all cursor-pointer h-full flex flex-col 
      ${isSelected ? 'border-2 border-primary shadow-lg' : 'border border-gray-200 hover:border-primary/40 hover:shadow-md'}`}
      onClick={() => onClick(service)}
    >
      <div className="flex items-start gap-3 md:gap-4">
        <div className="rounded-lg p-2 md:p-3 flex-shrink-0 bg-secondary">
          <ServiceIcon iconName={service.icon} className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">
            {service.name}
          </h3>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-3 md:mb-4">
            {service.description}
          </p>
          
          {service.badge ? (
            <span className="inline-block text-white text-xs md:text-sm font-medium px-3 py-1 rounded bg-primary">
              {service.badge}
            </span>
          ) : service.price ? (
            <span className="text-base md:text-lg font-semibold text-primary">
              {service.price}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

// ServiceList Component (MODIFIED)