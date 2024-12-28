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
      if (member.member_as === 'Patriarch') hasPatriarch = true;
      if (member.member_as === 'Matriarch') hasMatriarch = true;
    });

    return hasPatriarch && hasMatriarch;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className='my-4 carousel-container'>
        <h3 className='mx-auto'>{formattedFamiliesData[index]?.family_name.toUpperCase()}</h3>

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
                  <React.Fragment key={member.member_id}>
                    {member.member_as === 'Patriarch_Father' &&
                      member.sub_family_of === null && (
                        <CarouselImage
                          className='parent1'
                          member_image={member.member_image}
                          name={member.name}
                        />
                      )}
                    {member.member_as === 'Patriarch_Mother' &&
                      member.sub_family_of === null && (
                        <CarouselImage
                          className='parent2'
                          member_image={member.member_image}
                          name={member.name}
                        />
                      )}
                    {member.member_as === 'Matriarch_Father' &&
                      member.sub_family_of === null && (
                        <CarouselImage
                          className='parent21'
                          member_image={member.member_image}
                          name={member.name}
                        />
                      )}
                    {member.member_as === 'Matriarch_Mother' &&
                      member.sub_family_of === null && (
                        <CarouselImage
                          className='parent22'
                          member_image={member.member_image}
                          name={member.name}
                        />
                      )}
                    {member.member_as === 'Patriarch' && (
                      <CarouselImage
                        className='personpatriarch'
                        member_image={member.member_image}
                        name={member.name}
                      />
                    )}
                    {member.member_as === 'Matriarch' && (
                      <CarouselImage
                        className='personmatriarch'
                        member_image={member.member_image}
                        name={member.name}
                      />
                    )}
                    {(member.member_as === 'Son' || member.member_as === 'Daughter') && (
                      <CarouselImage
                        className={`person${member.order}`}
                        // className={`person20`}
                        member_image={member.member_image}
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
  const { className, member_image, name } = props;

  return (
    <img
      className={className}
      src={member_image}
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
