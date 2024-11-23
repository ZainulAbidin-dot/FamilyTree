import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Person {
  constructor(name, gender, image) {
    this.name = name;
    this.gender = gender;
    this.image = image || "https://randomuser.me/api/portraits/men/64.jpg";
    this.partner = null;
    this.parents = [];
    this.children = [];
  }

  addPartner(partner) {
    this.partner = partner;
  }

  addChild(child) {
    this.children.push(child);
    child.addParent(this);  // Ensure mutual reference with parent
  }

  addParent(parent) {
    this.parents.push(parent);
  }

  toJSON() {
    const { partner, ...rest } = this;
    return {
      ...rest,
      partner: partner
        ? {
            name: partner.name,
            gender: partner.gender,
            image: partner.image,
          }
        : null,
      children: this.children.map((child) => child.toJSON()),
      parents: this.parents.map((parent) => parent.toJSON()),
    };
  }
}

function FamilyTreeApp() {
  const [rootPerson, setRootPerson] = useState(null);
  const [allPersons, setAllPersons] = useState([]);
  const [selectedPersonName, setSelectedPersonName] = useState("");
  const [partnerModalVisible, setPartnerModalVisible] = useState(false);
  const [childModalVisible, setChildModalVisible] = useState(false);
  const [parentModalVisible, setParentModalVisible] = useState(false);  // For adding parent
  const [newPartner, setNewPartner] = useState({ name: "", gender: "", image: "" });
  const [newChild, setNewChild] = useState({ name: "", gender: "" });
  const [newParent, setNewParent] = useState({ name: "", gender: "", image: "" });

  const handleCreateRootPerson = (name, gender, image) => {
    const person = new Person(name, gender, image);
    setRootPerson(person);
    setSelectedPersonName(name);
    setAllPersons([person]);
  };

  const handleAddPartner = (name, gender, image) => {
    const partner = new Person(name, gender, image);
    const selectedPerson = allPersons.find((person) => person.name === selectedPersonName);
    
    if (selectedPerson) {
      selectedPerson.addPartner(partner);
      setAllPersons([...allPersons, partner]);
    }
    setPartnerModalVisible(false);
  };

  const handleAddChild = (name, gender) => {
    const child = new Person(name, gender);
    const selectedPerson = allPersons.find((person) => person.name === selectedPersonName);
    if (selectedPerson) {
      selectedPerson.addChild(child);
      setAllPersons([...allPersons, child]);
    }
    setChildModalVisible(false);
  };

  const handleAddParent = (name, gender, image) => {
    const parent = new Person(name, gender, image);
    const selectedPerson = allPersons.find((person) => person.name === selectedPersonName);
    if (selectedPerson) {
      selectedPerson.addParent(parent);
      setAllPersons([...allPersons, parent]);
    }
    setParentModalVisible(false);
  };

  const updateFamilyControls = () => {
    return allPersons.map((person) => (
      <option key={person.name} value={person.name}>
        {person.name}
      </option>
    ));
  };

  const printFamilyTree = () => {
    return JSON.stringify(allPersons, null, 2);
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "root") {
          setNewPartner({ ...newPartner, image: reader.result });
        } else if (type === "partner") {
          setNewPartner({ ...newPartner, image: reader.result });
        } else if (type === "parent") {
          setNewParent({ ...newParent, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="container my-5">
        <h1 className="text-center">Family Tree Builder</h1>

        {/* Root Person Form */}
        {!rootPerson && (
          <div id="rootForm" className="mb-4">
            <h4>Create Root Person</h4>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter root name"
                onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                onChange={(e) => setNewPartner({ ...newPartner, gender: e.target.value })}
              >
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Image Upload</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "root")}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleCreateRootPerson(newPartner.name, newPartner.gender, newPartner.image)}
            >
              Create Root Person
            </button>
          </div>
        )}

        {/* Family Tree Controls */}
        {rootPerson && (
          <div id="familyControls" className="">
            <h4>Manage Family Tree</h4>
            <div id="selectPersonToManage">
              <label className="form-label">Select Person to Add Partner/Children/Parents</label>
              <select
                className="form-select"
                key={selectedPersonName}
                value={selectedPersonName}
                onChange={(e) => setSelectedPersonName(e.target.value)}
              >
                {updateFamilyControls()}
              </select>
            </div>
            <button
              className="btn btn-success my-5"
              onClick={() => setPartnerModalVisible(true)}
            >
              Add Partner
            </button>
            <button
              className="btn btn-info my-5"
              onClick={() => setChildModalVisible(true)}
            >
              Add Child
            </button>
            <button
              className="btn btn-warning my-5"
              onClick={() => setParentModalVisible(true)}  // Show parent modal
            >
              Add Parent
            </button>
          </div>
        )}

        {/* Family Tree Display */}
        <div id="familyTreeDisplay" className="border p-3">
          <h4>Family Tree:</h4>
          <pre>{printFamilyTree()}</pre>
        </div>

        {/* Partner Modal */}
        {partnerModalVisible && (
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Partner</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setPartnerModalVisible(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Partner Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newPartner.name}
                      onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      value={newPartner.gender}
                      onChange={(e) => setNewPartner({ ...newPartner, gender: e.target.value })}
                    >
                      <option value="" disabled selected>
                        Select Gender
                      </option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image Upload</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "partner")}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setPartnerModalVisible(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      handleAddPartner(newPartner.name, newPartner.gender, newPartner.image)
                    }
                  >
                    Add Partner
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Child Modal */}
        {childModalVisible && (
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Child</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setChildModalVisible(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Child Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newChild.name}
                      onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      value={newChild.gender}
                      onChange={(e) => setNewChild({ ...newChild, gender: e.target.value })}
                    >
                      <option value="" disabled selected>
                        Select Gender
                      </option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setChildModalVisible(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleAddChild(newChild.name, newChild.gender)}
                  >
                    Add Child
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Parent Modal */}
        {parentModalVisible && (
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Parent</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setParentModalVisible(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Parent Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newParent.name}
                      onChange={(e) => setNewParent({ ...newParent, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      value={newParent.gender}
                      onChange={(e) => setNewParent({ ...newParent, gender: e.target.value })}
                    >
                      <option value="" disabled selected>
                        Select Gender
                      </option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image Upload</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "parent")}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setParentModalVisible(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      handleAddParent(newParent.name, newParent.gender, newParent.image)
                    }
                  >
                    Add Parent
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
                       
      {/* Picture of tree with family members on the branches */}
      <div className="treecontainer">
            {allPersons.length > 0 && (
                  <img className='person1' src={allPersons.length > 0 && allPersons[0].image ? allPersons[0].image : 'https://randomuser.me/api/portraits/women/64.jpg'} alt="" />
            ) }
            {allPersons.length > 0 && allPersons[0]?.partner?.image && (
                  <img className='person2' src={allPersons.length > 0 && allPersons[0]?.partner?.image ? allPersons[0].partner.image : 'https://randomuser.me/api/portraits/women/64.jpg'} alt="" />
            )}
            {allPersons.length > 0 && allPersons[0]?.children[0]?.image && (
                  <img className='person3' src={allPersons.length > 0 && allPersons[0]?.children[0]?.image ? allPersons[0].children[0].image : 'https://randomuser.me/api/portraits/women/64.jpg'} alt="" />
            )}
            {allPersons.length > 0 && allPersons[0]?.children[1]?.image && (
                  <img className='person4' src={allPersons.length > 0 && allPersons[0]?.children[1]?.image ? allPersons[0].children[1].image : 'https://randomuser.me/api/portraits/women/64.jpg'} alt="" />
            )}
            {allPersons.length > 0 && allPersons[0]?.children[1]?.image && (
                  <img className='person5' src={allPersons.length > 0 && allPersons[0]?.children[1]?.image ? allPersons[0].children[1].image : 'https://randomuser.me/api/portraits/women/64.jpg'} alt="" />
            )}
            {allPersons.length > 0 && allPersons[0]?.children[1]?.image && (
                  <img className='person6' src={allPersons.length > 0 && allPersons[0]?.children[1]?.image ? allPersons[0].children[1].image : 'https://randomuser.me/api/portraits/women/64.jpg'} alt="" />
            )}
            {allPersons.length > 0 && allPersons[0]?.children[1]?.image && (
                  <img className='person7' src={allPersons.length > 0 && allPersons[0]?.children[1]?.image ? allPersons[0].children[1].image : 'https://randomuser.me/api/portraits/women/64.jpg'} alt="" />
            )}
            {allPersons.length > 0 && allPersons[0]?.children[1]?.image && (
                  <img className='person8' src={allPersons.length > 0 && allPersons[0]?.children[1]?.image ? allPersons[0].children[1].image : 'https://randomuser.me/api/portraits/women/64.jpg'} alt="" />
            )}
            {allPersons.length > 0 && allPersons[0]?.children[1]?.image && (
                  <img className='person9' src={allPersons.length > 0 && allPersons[0]?.children[1]?.image ? allPersons[0].children[1].image : 'https://randomuser.me/api/portraits/women/64.jpg'} alt="" />
            )}
            {allPersons.length > 0 && allPersons[0]?.children[1]?.image && (
                  <img className='person10' src={allPersons.length > 0 && allPersons[0]?.children[1]?.image ? allPersons[0].children[1].image : 'https://randomuser.me/api/portraits/women/64.jpg'} alt="" />
            )}
            {allPersons.length > 0 && allPersons[0]?.parents[0]?.image && (
                  <img className='parent1' src={allPersons.length > 0 && allPersons[0]?.parents[0]?.image ? allPersons[0].parents[0].image : 'https://randomuser.me/api/portraits/women/64.jpg'} alt="" />
            )}
            {allPersons.length > 0 && allPersons[0]?.parents[0]?.image && (
                  <img className='parent2' src={allPersons.length > 0 && allPersons[0]?.parents[1]?.image ? allPersons[0].parents[0].image : 'https://randomuser.me/api/portraits/women/64.jpg'} alt="" />
            )}
      </div>
    </>
  );
}

export default FamilyTreeApp;
