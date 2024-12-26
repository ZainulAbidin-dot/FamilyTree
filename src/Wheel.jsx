import React, { useEffect, useState } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import GridLayout from 'react-grid-layout';
import { axiosClient, BACKEND_URL } from './axios-client';

const Wheel = () => {
  const [rootFamily, setRootFamily] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosClient.get('/family-tree');
      setRootFamily(data);
    }
    fetchData();
  }, []);

  const windowWidth = window.innerWidth;

  const elementsPerRow = Math.floor(windowWidth / 300);

  const layout = rootFamily.map((family, index) => {
    const x = (index % elementsPerRow) * 2;

    const y = Math.floor(index / elementsPerRow) * 2;

    return {
      i: family.family_id.toString(),
      x: x,
      y: y,
      w: 1,
      h: 1,
    };
  });

  const familyOrderArr = [
    "Rephael & Henny",
    "Dovi & Chava",
    "Moshe & Sarala",
    "Yaakov Ben-Tzion & Rivky",
    "Yitzy & Perel Bracha",
    "Moshe Eliyahu & Ahuva",
    "Sholom & Rochel",
    "Mayer Moshe & Esther Toby",
    "Aba & Ema",
    "M.M & Sara",
    "Avrohom Shimon & Shani",
    "Chaim Tzvi & Yehudis",
    "Tzvi & Rivky",
    "Eli & Tzivi",
    "Chaim & Chaya Deena",
    "Avrohom Tzvi & Leah",
    "Chaim & Rochela"
  ];

  // console.log(rootFamily)
  const reorderedFamily = [];
  
  familyOrderArr.forEach(orderedFamilyName => rootFamily.map(family => {
    if(orderedFamilyName == family.family_name) reorderedFamily.push(family);
  }))

  console.log(rootFamily)

  return (
    <div>
      <h1 className='text-dark'>The Orchard</h1>
      <div>
        {/* <GridLayout
          autoSize={true}
          layout={layout}
          useCSSTransforms={true}
          allowOverlap={true}
          isResizable={false}
          isDraggable={true}
          width={window.innerWidth}
        >
          {rootFamily.map((family) => (
            <div className='d-flex flex-column align-items-center' key={family.family_id}>
              <p style={{ fontSize: '9px' }} className='h6 lead text-center m-0'>
                {family.family_name}
              </p>
              <div className='rootTree m-0'>
                {family.members.map((member, index2) => (
                  <div key={member.member_id} className='mb-2 text-center'>
                    {member.member_as === 'Patriarch_Father' &&
                      member.sub_family_of === null && (
                        // <img
                        //   className='parent3'
                        //   src={
                        //     member.member_image.startsWith('data:image')
                        //       ? member.member_image
                        //       : `${BACKEND_URL}/${member.member_image}` ||
                        //         'https://randomuser.me/api/portraits/women/64.jpg'
                        //   }
                        //   alt=''
                        //   data-bs-toggle='tooltip'
                        //   data-bs-placement='top'
                        //   title={member.name}
                        // />
                        <WheelImage
                          className='parent3'
                          member_image={member.member_image}
                          name={member.name}
                        />
                      )}
                    {member.member_as === 'Patriarch_Mother' &&
                      member.sub_family_of === null && (
                        // <img
                        //   className='parent4'
                        //   src={
                        //     member.member_image.startsWith('data:image')
                        //       ? member.member_image
                        //       : `${BACKEND_URL}/${member.member_image}` ||
                        //         'https://randomuser.me/api/portraits/women/64.jpg'
                        //   }
                        //   alt=''
                        //   data-bs-toggle='tooltip'
                        //   data-bs-placement='top'
                        //   title={member.name}
                        // />
                        <WheelImage
                          className='parent4'
                          member_image={member.member_image}
                          name={member.name}
                        />
                      )}
                    {member.member_as === 'Matriarch_Father' &&
                      member.sub_family_of === null && (
                        // <img
                        //   className='parent23'
                        //   src={
                        //     member.member_image.startsWith('data:image')
                        //       ? member.member_image
                        //       : `${BACKEND_URL}/${member.member_image}` ||
                        //         'https://randomuser.me/api/portraits/women/64.jpg'
                        //   }
                        //   alt=''
                        //   data-bs-toggle='tooltip'
                        //   data-bs-placement='top'
                        //   title={member.name}
                        // />
                        <WheelImage
                          className='parent23'
                          member_image={member.member_image}
                          name={member.name}
                        />
                      )}
                    {member.member_as === 'Matriarch_Mother' &&
                      member.sub_family_of === null && (
                        // <img
                        //   className='parent24'
                        //   src={
                        //     member.member_image.startsWith('data:image')
                        //       ? member.member_image
                        //       : `${BACKEND_URL}/${member.member_image}` ||
                        //         'https://randomuser.me/api/portraits/women/64.jpg'
                        //   }
                        //   alt=''
                        //   data-bs-toggle='tooltip'
                        //   data-bs-placement='top'
                        //   title={member.name}
                        // />
                        <WheelImage
                          className='parent24'
                          member_image={member.member_image}
                          name={member.name}
                        />
                      )}
                    {member.member_as === 'Patriarch' && (
                      // <img
                      //   className='rootpersonpatriarch'
                      //   src={
                      //     member.member_image.startsWith('data:image')
                      //       ? member.member_image
                      //       : `${BACKEND_URL}/${member.member_image}` ||
                      //         'https://randomuser.me/api/portraits/women/64.jpg'
                      //   }
                      //   alt=''
                      //   data-bs-toggle='tooltip'
                      //   data-bs-placement='top'
                      //   title={member.name}
                      // />
                      <WheelImage
                        className='rootpersonpatriarch'
                        member_image={member.member_image}
                        name={member.name}
                      />
                    )}
                    {member.member_as === 'Matriarch' && (
                      // <img
                      //   className='rootpersonmatriarch'
                      //   src={
                      //     member.member_image.startsWith('data:image')
                      //       ? member.member_image
                      //       : `${BACKEND_URL}/${member.member_image}` ||
                      //         'https://randomuser.me/api/portraits/women/64.jpg'
                      //   }
                      //   alt=''
                      //   data-bs-toggle='tooltip'
                      //   data-bs-placement='top'
                      //   title={member.name}
                      // />
                      <WheelImage
                        className='rootpersonmatriarch'
                        member_image={member.member_image}
                        name={member.name}
                      />
                    )}
                    {(member.member_as === 'Son' || member.member_as === 'Daughter') && (
                      // <img
                      //   className={`rootperson1${1 + index2}`}
                      //   src={
                      //     member.member_image.startsWith('data:image')
                      //       ? member.member_image
                      //       : `${BACKEND_URL}/${member.member_image}` ||
                      //         'https://randomuser.me/api/portraits/women/64.jpg'
                      //   }
                      //   alt=''
                      //   data-bs-toggle='tooltip'
                      //   data-bs-placement='top'
                      //   title={member.name}
                      //   style={{
                      //     position: 'absolute',
                      //     borderRadius: '50%',
                      //     transition: 'transform 0.3s ease-in-out, z-index 0s',
                      //     // top: `${40 + (index2 )}%`,  // Dynamically adjust top position based on the index
                      //     // left: `${40 + (index2 )}%`  // Dynamically adjust left position based on the index
                      //   }}
                      //   onMouseEnter={(e) => {
                      //     e.target.style.borderRadius = '5%';
                      //     e.target.style.transform = 'scale(6)';
                      //     e.target.style.zIndex = '9999'; // Ensure the image is on top when hovered
                      //   }}
                      //   onMouseLeave={(e) => {
                      //     e.target.style.borderRadius = '50%';
                      //     e.target.style.transform = 'scale(1)';
                      //     e.target.style.zIndex = '1'; // Reset z-index to normal when hover ends
                      //   }}
                      // />
                      <WheelImage
                        className={`rootperson1${1 + index2}`}
                        member_image={member.member_image}
                        name={member.name}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </GridLayout> */}

        <div className='grid-layout'>
          {reorderedFamily.map((family) => {
            let counter = 1;

            return (
              <div onClick={(e) => {
                const gridItem = e.currentTarget; // Use the clicked element
                // Move to center
                gridItem.style.position = "fixed";
                gridItem.style.top = "50%";
                gridItem.style.left = "50%";
                gridItem.style.transform = "translate(-50%, -50%) scale(4)";
                gridItem.style.transition = "transform 0.7s ease-in-out, top 0.7s ease-in-out, left 0.7s ease-in-out";
                gridItem.style.zIndex = "10";
                gridItem.style.backgroundColor = "white";
            
                // After 15 seconds, return to original position
                setTimeout(() => {
                  gridItem.style.position = "";
                  gridItem.style.top = "";
                  gridItem.style.left = "";
                  gridItem.style.transform = "scale(1)";
                  gridItem.style.zIndex = "";              
                  gridItem.style.backgroundColor = "transparent";
                }, 10000);
              }} className='grid-item d-flex flex-column align-items-center' key={family.family_id}>
                <p style={{ fontSize: '9px' }} className='h6 lead text-center m-0'>
                  {family.family_name}
                </p>
                <div className='rootTree m-0'>
                  {family.members.map((member, index2) => (
                    <div key={member.member_id} className='mb-2 text-center'>
                      {member.member_as === 'Patriarch_Father' &&
                        member.sub_family_of === null && (
                          // <img
                          //   className='parent3'
                          //   src={
                          //     member.member_image.startsWith('data:image')
                          //       ? member.member_image
                          //       : `${BACKEND_URL}/${member.member_image}` ||
                          //         'https://randomuser.me/api/portraits/women/64.jpg'
                          //   }
                          //   alt=''
                          //   data-bs-toggle='tooltip'
                          //   data-bs-placement='top'
                          //   title={member.name}
                          // />
                          <WheelImage
                            className='parent3'
                            member_image={member.member_image}
                            name={member.name}
                          />
                        )}
                      {member.member_as === 'Patriarch_Mother' &&
                        member.sub_family_of === null && (
                          // <img
                          //   className='parent4'
                          //   src={
                          //     member.member_image.startsWith('data:image')
                          //       ? member.member_image
                          //       : `${BACKEND_URL}/${member.member_image}` ||
                          //         'https://randomuser.me/api/portraits/women/64.jpg'
                          //   }
                          //   alt=''
                          //   data-bs-toggle='tooltip'
                          //   data-bs-placement='top'
                          //   title={member.name}
                          // />
                          <WheelImage
                            className='parent4'
                            member_image={member.member_image}
                            name={member.name}
                          />
                        )}
                      {member.member_as === 'Matriarch_Father' &&
                        member.sub_family_of === null && (
                          <WheelImage
                            className='parent23'
                            member_image={member.member_image}
                            name={member.name}
                          />
                        )}
                      {member.member_as === 'Matriarch_Mother' &&
                        member.sub_family_of === null && (
                          <WheelImage
                            className='parent24'
                            member_image={member.member_image}
                            name={member.name}
                          />
                        )}
                      {member.member_as === 'Patriarch' && (
                        <WheelImage
                          className='rootpersonpatriarch'
                          member_image={member.member_image}
                          name={member.name}
                        />
                      )}
                      {member.member_as === 'Matriarch' && (
                        <WheelImage
                          className='rootpersonmatriarch'
                          member_image={member.member_image}
                          name={member.name}
                        />
                      )}
                      {(member.member_as === 'Son' || member.member_as === 'Daughter') && (
                        <WheelImage
                          // className={`rootperson120`}
                          className={`rootperson1${counter++}`}
                          member_image={member.member_image}
                          name={member.name}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

function WheelImage(props) {
  const { className, member_image, name } = props;

  return (
    <img
      className={className}
      src={
        member_image.startsWith('data:image')
          ? member_image
          : `${BACKEND_URL}/${member_image}` ||
            'https://randomuser.me/api/portraits/women/64.jpg'
      }
      alt={name}
      data-bs-toggle='tooltip'
      data-bs-placement='top'
      title={name}
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

export default Wheel;
