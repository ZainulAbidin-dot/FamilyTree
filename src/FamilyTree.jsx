import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import { useFamilyTree } from './context/FamilyTreeContext';

function FamilyTreeApp() {
  const { familyTreeData, loading } = useFamilyTree();
  const [index, setIndex] = React.useState(0);
  const navigate = useNavigate();

  // Handle Carousel index selection
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    console.log(selectedIndex);

    if (selectedIndex === formattedFamiliesData.length - 1) {
      setTimeout(() => {
        navigate('/orchard');
      }, 6000);
    }
  };

  const formattedFamiliesData = familyTreeData?.filter((familyData) => {
    let hasPatriarch = false;
    let hasMatriarch = false;

    familyData.members?.forEach((member) => {
      if (member.memberAs === 'Patriarch') hasPatriarch = true;
      if (member.memberAs === 'Matriarch') hasMatriarch = true;
    });

    return hasPatriarch && hasMatriarch;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className='my-4 carousel-container'>
        <h3 className='mx-auto'>{formattedFamiliesData[index]?.familyName.toUpperCase()}</h3>

        <Carousel
          fade
          wrap={false}
          indicators={false}
          activeIndex={index}
          onSelect={handleSelect}
          interval={30 * 1000}
        >
          {formattedFamiliesData.map((familyData, familyIndex) => {
            let counter = 1;
            return (
              <Carousel.Item key={familyIndex} className='treecontainer'>
                {familyData?.members?.map((member, index2) => (
                  <React.Fragment key={member.memberId}>
                    {member.memberAs === 'Patriarch_Father' &&
                      member.subFamilyOf === null && (
                        <CarouselImage
                          className='parent1'
                          memberImage={member.memberImage}
                          name={member.name}
                        />
                      )}
                    {member.memberAs === 'Patriarch_Mother' &&
                      member.subFamilyOf === null && (
                        <CarouselImage
                          className='parent2'
                          memberImage={member.memberImage}
                          name={member.name}
                        />
                      )}
                    {member.memberAs === 'Matriarch_Father' &&
                      member.subFamilyOf === null && (
                        <CarouselImage
                          className='parent21'
                          memberImage={member.memberImage}
                          name={member.name}
                        />
                      )}
                    {member.memberAs === 'Matriarch_Mother' &&
                      member.subFamilyOf === null && (
                        <CarouselImage
                          className='parent22'
                          memberImage={member.memberImage}
                          name={member.name}
                        />
                      )}
                    {member.memberAs === 'Patriarch' && (
                      <CarouselImage
                        className='personpatriarch'
                        memberImage={member.memberImage}
                        name={member.name}
                      />
                    )}
                    {member.memberAs === 'Matriarch' && (
                      <CarouselImage
                        className='personmatriarch'
                        memberImage={member.memberImage}
                        name={member.name}
                      />
                    )}
                    {(member.memberAs === 'Son' || member.memberAs === 'Daughter') && (
                      <CarouselImage
                        className={`person${member.order}`}
                        // className={`person20`}
                        memberImage={member.memberImage}
                        name={member.name}
                      />
                    )}
                  </React.Fragment>
                ))}
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}

function CarouselImage(props) {
  const { className, memberImage, name } = props;

  return (
    <img
      className={className}
      src={memberImage}
      alt={name}
      data-bs-toggle='tooltip'
      data-bs-placement='top'
      title={name}
      loading='lazy'
      style={{
        position: 'absolute',
        borderRadius: '50%',
        transition: 'transform 0.3s ease-in-out, z-index 0s',
      }}
      onMouseEnter={(e) => {
        e.target.style.borderRadius = '5%';
        e.target.style.transform = 'scale(6)';
        e.target.style.zIndex = '9999'; // Ensure the image is on top when hovered
      }}
      onMouseLeave={(e) => {
        e.target.style.borderRadius = '50%';
        e.target.style.transform = 'scale(1)';
        e.target.style.zIndex = '1'; // Reset z-index to normal when hover ends
      }}
    />
  );
}

export default FamilyTreeApp;
