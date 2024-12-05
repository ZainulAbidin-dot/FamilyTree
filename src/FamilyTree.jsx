import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { axiosClient, BACKEND_URL } from './axios-client';

function FamilyTreeApp() {
  const [familiesData, setFamiliesData] = useState([]);
  const [index, setIndex] = useState(0);

  // Handle Carousel index selection
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    console.log(selectedIndex);
  };

  // Fetch families data
  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosClient.get('/families-with-members', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(data);
      setFamiliesData(data);
    }
    fetchData();
  }, []);

  const formattedFamiliesData = familiesData?.filter((familyData) => {
    let hasPatriarch = false;
    let hasMatriarch = false;

    familyData.members?.forEach((member) => {
      if (member.member_as === 'Patriarch') hasPatriarch = true;
      if (member.member_as === 'Matriarch') hasMatriarch = true;
    });

    return hasPatriarch && hasMatriarch;
  });
  console.log(formattedFamiliesData);

  return (
    <>
      <div className='my-5'>
        <h3 className='text-dark'>
          Family Name: {formattedFamiliesData[index]?.family_name}
        </h3>
        <p className='text-dark'>
          Head of Family: {formattedFamiliesData[index]?.family_head_name}
        </p>
        <Carousel fade activeIndex={index} onSelect={handleSelect}>
          {formattedFamiliesData.map((familyData, familyIndex) => (
            <Carousel.Item key={familyIndex} className='treecontainer'>
              {familyData?.members?.map((member, index2) => (
                <React.Fragment key={member.member_id}>
                  {member.member_as === 'Patriarch_Father' &&
                    member.sub_family_of === null && (
                      <img
                        className='parent1'
                        src={
                          `${BACKEND_URL}/${member.member_image}` ||
                          'https://randomuser.me/api/portraits/women/64.jpg'
                        }
                        alt=''
                        data-bs-toggle='tooltip'
                        data-bs-placement='top'
                        title={member.name}
                        style={{
                          position: 'absolute',
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          transition: 'transform 0.3s ease-in-out, z-index 0s',
                          // top: `${40 + (index2 )}%`,  // Dynamically adjust top position based on the index
                          // left: `${40 + (index2 )}%`  // Dynamically adjust left position based on the index
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
                    )}
                  {member.member_as === 'Patriarch_Mother' &&
                    member.sub_family_of === null && (
                      <img
                        className='parent2'
                        src={
                          `${BACKEND_URL}/${member.member_image}` ||
                          'https://randomuser.me/api/portraits/women/64.jpg'
                        }
                        alt=''
                        data-bs-toggle='tooltip'
                        data-bs-placement='top'
                        title={member.name}
                        style={{
                          position: 'absolute',
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          transition: 'transform 0.3s ease-in-out, z-index 0s',
                          // top: `${40 + (index2 )}%`,  // Dynamically adjust top position based on the index
                          // left: `${40 + (index2 )}%`  // Dynamically adjust left position based on the index
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
                    )}
                  {member.member_as === 'Matriarch_Father' &&
                    member.sub_family_of === null && (
                      <img
                        className='parent21'
                        src={
                          `${BACKEND_URL}/${member.member_image}` ||
                          'https://randomuser.me/api/portraits/women/64.jpg'
                        }
                        alt=''
                        data-bs-toggle='tooltip'
                        data-bs-placement='top'
                        title={member.name}
                        style={{
                          position: 'absolute',
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          transition: 'transform 0.3s ease-in-out, z-index 0s',
                          // top: `${40 + (index2 )}%`,  // Dynamically adjust top position based on the index
                          // left: `${40 + (index2 )}%`  // Dynamically adjust left position based on the index
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
                    )}
                  {member.member_as === 'Matriarch_Mother' &&
                    member.sub_family_of === null && (
                      <img
                        className='parent22'
                        src={
                          `${BACKEND_URL}/${member.member_image}` ||
                          'https://randomuser.me/api/portraits/women/64.jpg'
                        }
                        alt=''
                        data-bs-toggle='tooltip'
                        data-bs-placement='top'
                        title={member.name}
                        style={{
                          position: 'absolute',
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          transition: 'transform 0.3s ease-in-out, z-index 0s',
                          // top: `${40 + (index2 )}%`,  // Dynamically adjust top position based on the index
                          // left: `${40 + (index2 )}%`  // Dynamically adjust left position based on the index
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
                    )}
                  {member.member_as === 'Patriarch' && (
                    <img
                      className='personpatriarch'
                      src={
                        `${BACKEND_URL}/${member.member_image}` ||
                        'https://randomuser.me/api/portraits/women/64.jpg'
                      }
                      alt=''
                      data-bs-toggle='tooltip'
                      data-bs-placement='top'
                      title={member.name}
                      style={{
                        position: 'absolute',
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        transition: 'transform 0.3s ease-in-out, z-index 0s',
                        // top: `${40 + (index2 )}%`,  // Dynamically adjust top position based on the index
                        // left: `${40 + (index2 )}%`  // Dynamically adjust left position based on the index
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
                  )}
                  {member.member_as === 'Matriarch' && (
                    <img
                      className='personmatriarch'
                      src={
                        `${BACKEND_URL}/${member.member_image}` ||
                        'https://randomuser.me/api/portraits/women/64.jpg'
                      }
                      alt=''
                      data-bs-toggle='tooltip'
                      data-bs-placement='top'
                      title={member.name}
                      style={{
                        position: 'absolute',
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        transition: 'transform 0.3s ease-in-out, z-index 0s',
                        // top: `${40 + (index2 )}%`,  // Dynamically adjust top position based on the index
                        // left: `${40 + (index2 )}%`  // Dynamically adjust left position based on the index
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
                  )}
                  {(member.member_as === 'Son' || member.member_as === 'Daughter') && (
                    <img
                      className={`person${1 + index2}`} // This will start from person3 and increment for each child
                      src={
                        `${BACKEND_URL}/${member.member_image}` ||
                        'https://randomuser.me/api/portraits/women/64.jpg'
                      }
                      alt=''
                      data-bs-toggle='tooltip'
                      data-bs-placement='top'
                      title={member.name}
                      style={{
                        position: 'absolute',
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        transition: 'transform 0.3s ease-in-out, z-index 0s',
                        // top: `${40 + (index2 )}%`,  // Dynamically adjust top position based on the index
                        // left: `${40 + (index2 )}%`  // Dynamically adjust left position based on the index
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
                  )}
                </React.Fragment>
              ))}
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default FamilyTreeApp;
