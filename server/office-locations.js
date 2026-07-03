// Public OpenStreetMap objects checked 2026-10-18. Points are approximate;
// they are not surveyed boundaries or government-certified office coordinates.
const savar={latitude:23.834225,longitude:90.2576536,coordinateSourceUrl:'https://www.openstreetmap.org/node/5240549386',coordinateCheckedAt:'2026-10-18'};
// Mean of the four distinct nodes of building way 530200683.
const patiya={latitude:22.296936,longitude:91.97649565,coordinateSourceUrl:'https://www.openstreetmap.org/way/530200683',coordinateCheckedAt:'2026-10-18'};
const locations={'official:savar-acland':savar,'official:savar-surveyor':savar,'official:patiya-acland':patiya};
export function withKnownOfficeLocation(contact,updatedBy){
  const point=locations[contact.id];
  return point&&updatedBy==='source-seed'&&contact.latitude===null&&contact.longitude===null?{...contact,...point}:contact;
}
