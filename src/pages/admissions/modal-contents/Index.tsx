import Notice, {
  theme as NoticeTheme,
} from "../../../components/common/Notice";
import Button from "../../../components/common/Button";
import DocumentCard from "../../../components/cards/DocumentCard";

import logo from "../../../assets/favicon.png";
import { GenericObject } from "../../../interfaces";
import { Formik } from "formik";

export const RulesAndRegulations = ({
  closeHandler,
}: {
  closeHandler: () => void;
}) => {
  return (
    <div className="flex flex-col items-center w-[95%] sm:w-[55vw] h-[88vh] overflow-y-auto sm:px-3">
      <img
        src={logo}
        alt="log"
        width={"70px"}
        height={"70px"}
        className="py-2"
        style={{ objectFit: "contain" }}
      />

      <h2 className="font-bold text-slate-900 text-2xl uppercase mb-2 w-full border-b pb-3 text-center">
        Rule &amp; Regulations
      </h2>

      <div className="flex flex-col gap-4 mt-0 w-full">
        <Notice
          title="Notice"
          message={
            "All applicants are expected to read and understand the rules and regulation governing his/her school of application before proceeding with filling the application form. Kindly click the button at the bottom of this page to proceed to the forms page when you are done."
          }
        />

        <fieldset className="flex flex-col flex-grow gap-2 px-3 pb-6 border-t rounded-lg">
          <legend className="text-base uppercase font-bold py-1 pl-1 pr-2 text-slate-900">
            Bye-laws governing gh media school
          </legend>

          <div className="flex gap-1 flex-col text-xs font-normal mt-1 py-2 px-3 border bg-orange-400 text-white border-orange-500 rounded-sm">
            {/* <span className="font-bold text-white">Kindly Note:</span>{" "} */}
            <span className="font-semibold">
              All laws listed below are applicable to all GH Media School
              applicants
            </span>
          </div>

          <ul
            style={{ listStyleType: "circle" }}
            className="flex flex-col gap-4 pl-5"
          >
            {[
              {
                heading: "Compliance with school rules and regulation",
                text: "Every student is entitled to the acquaintance with the rules and regulations governing the school and is expected to comply by them accordingly. Breach of the rules shall warrant sanctions like warning, suspension, dismissal",
              },
              {
                heading: "Student liability for damage",
                text: "Students are by these rules encouraged to handle all school properties and equipment with care. Improper handling, damage or loss of school properties would require their replacement or payment by the student.",
              },
              {
                heading: "Attachment",
                text: (
                  <>
                    Brilliant and deserving students will be assisted by the
                    school to gain attachment in reputable media institutions.
                    Those who do not fall in the stated category would have to
                    find attachment by their own means.
                    <ul style={{ listStyleType: "square" }} className="pl-4">
                      <li>School fees.</li>
                      <li>
                        Students are expected to fully pay their school fees
                        before the commencement of the end of semester exam.
                      </li>
                      <li>
                        Accumulation of fees by the end of the year will warrant
                        the withholding of students’ certificate on completion
                        of the course.
                      </li>
                      <li>
                        Students shall accept any timely increment in school
                        fees.
                      </li>
                      <li>
                        Foreign applicants are required to pay fees in full
                        prior to their studies.
                      </li>
                      <li>Fees paid are not refundable.</li>
                    </ul>
                  </>
                ),
              },
              {
                heading: "Regularity & Punctuality",
                text: "Students should attend every lecture and be on time to avoid lateness. Failure to attend lectures regularly reliefs the administration from aiding to put you on attachment, students who miss lectures for 3 consecutive days should not expect administration to aid in their attachment.",
              },
              {
                heading: "Project work",
                text: "Since our courses are 70% practical, students must prepare in “time” and “finance” for any travelling, staying on set for certain number of days, or practical aimed at enhancing their course in school. Students will also be required to complete specific projects by different lectures during studies.",
              },
              {
                heading: "Compulsory church service",
                text: "Every student must be present during church service. It is compulsory for all. Information and announcements are given during this session, which is relevant to all students. Refusal to attend would call for an unpleasant sanction.",
              },
              {
                heading: "Use of school property",
                text: "Use of school properties like studio equipment, facilities etc. must be done with the appropriate permission and relevant documentation from authorities. NOTE: Students must be ready to accept other interim bye laws which may emerge from time to time during the cause of study",
              },
              {
                heading: "Subjection to disciplinary actions",
                text: "Any offender of the stipulated rules should be willing to subject himself to any form of disciplinary action proposed by the school authorities, disciplinary committee or the SRC executives without complaint or protest.",
              },
              {
                heading: "Good behaviour",
                text: "Every student is expected to put up a good and accommodating behavior with a high level of comportment, courtesy, discipline, and good moral values.",
              },
              {
                heading: "Academic Performance",
                text: (
                  <>
                    <ul style={{ listStyleType: "square" }} className="pl-4">
                      <li>
                        Students are expected to study hard to avoid abject
                        failure in their exams.
                      </li>
                      <li>
                        Failing in 3 or more subject in a semester will warrant
                        outright withdrawal from the school. Fees paid would not
                        to be refundable
                      </li>
                      <li>
                        Failing in 1 or 2 subjects would necessitate re-sitting.
                        Failure to re-sit by the following semester would
                        mandate withdrawal.
                      </li>
                      <li>
                        Students are expected to meet at least an average
                        academic performance (Both in theory and practical’s) to
                        be eligible for graduation.
                      </li>
                      <li>
                        Rampant absence from class without any authentic and
                        verified reason would affect ones eligibility to
                        graduate after school.
                      </li>
                      <li>
                        Continuing students who only report to school after
                        mid-semester exams would be withdrawn from the school
                        automatically.
                      </li>
                    </ul>
                  </>
                ),
              },
              {
                heading: "Full and active perticipation in school activities",
                text: "Every member is encouraged to play active role in the school’s activities - for example, participation in SRC week celebration and elections, group work, church services, sports and other extra curricula activities.",
              },
              {
                heading: "Copyright",
                text: "The student must accept that any productions including film, video, soundtracks, writing, recording and any other products from students’ projects and works whiles in school shall vest in GH Media School to whom all copyright and ownership belong and without whose permission, there shall be no use of such works. GH Media School also holds the sole right to show or broadcast any of her students’ work at her own time and sole discretion.",
              },
              {
                heading: "Respect for student leadership",
                text: "Every student must be ready to accord the student leadership (SRC), the respect due it. They must also comply with bye-laws which would emerge from their end to help ensure sanity in school.",
              },
            ].map((each, ii) => (
              <li key={ii} className="flex-grow w-full">
                <h4 className="text-sm text-slate-900 font-semibold capitalize mb-2">
                  {each?.heading}
                </h4>

                <div className="text-xs font-normal leading-6 text-slate-900">
                  {each?.text}
                </div>
              </li>
            ))}
          </ul>
        </fieldset>

        <fieldset className="flex flex-col flex-grow gap-2 px-3 pb-6 border-t rounded-lg">
          <legend className="text-base uppercase font-bold py-1 pl-1 pr-2 text-slate-900">
            GH Cosmetology School Rules &amp; Regulations
          </legend>

          <div className="flex flex-col gap-1 text-xs font-normal mt-1 py-2 px-3 border bg-orange-400 text-white border-orange-500 rounded-sm">
            {/* <span className="font-semibold text-white">Kindly Note:</span>{" "} */}
            <span className="font-medium">
              GH Cosmetology School reserves the right and the prerogative to
              sanction and / or terminate the training of any student who
              breaches these rules and regulation during their stay in the
              school. Other bye-laws would be duly communicated to students to
              aid and regulate better teaching and learning environment.
            </span>
          </div>

          <ul
            style={{ listStyleType: "circle" }}
            className="flex flex-col gap-4 pl-5"
          >
            {[
              {
                heading: "Discipline and personal hygiene",
                text: "Discipline and personal hygiene is of utmost importance to the academy therefore all student must look very neat and smart always. Indecently dressed students will not be allowed inside the school premises.",
              },
              {
                heading: "Student to model for each other",
                text: "During practical sessions, student are expected to model for each other. If for any reason a student cannot do so, by reason of any medical codition, he or she must notify the school on enrollment with necessary evidence.",
              },
              {
                heading: "Prescribed dress code appearance",
                text: (
                  <>
                    In a bid to inculcate a Professional apperance in students,
                    they are to be in the prescribed uniforms at all times.{" "}
                    <br /> All students must wear the prescribed school uniform:
                    <ul style={{ listStyleType: "square" }} className="pl-4">
                      <li>
                        <b>Uniforms: </b>School Lacoste and school cloth. No
                        mufti and unprescribed uniforms would be allowed.
                      </li>
                      <li>
                        <b>
                          Footwear (BLACK, BROWN, or WHITE loafers/flat shoes):{" "}
                        </b>
                        No talking shoes or high heeled footwears are allowed.
                      </li>
                      <li>
                        <b>Accessories: </b>With the exception of wedding rings
                        and earrings, no other form of accesories or body
                        jewelries are allowed during and around classes' hours.
                      </li>
                    </ul>
                  </>
                ),
              },
              {
                heading: "Class attendance",
                text: "Punctuality and regularity to class must be ensured. The instructor reserves every right to sanction late comers accordingly.",
              },
              {
                heading: "Appearance during practical",
                text: "Students must ensure that during practical hours, they wear overalls or aprons. No student will be permitted to work without it, hence, will not be allowed in class.",
              },
              {
                heading: "School property",
                text: "Students are expected to handle all school properties including tools and equipment with a sense of responsibilty or else damages caused to any school property is payable.",
              },
            ].map((each, ii) => (
              <li key={ii} className="flex-grow w-full">
                <h4 className="text-sm text-slate-900 font-semibold capitalize mb-2">
                  {each?.heading}
                </h4>

                <div className="text-xs font-normal leading-6 text-slate-900">
                  {each?.text}
                </div>
              </li>
            ))}
          </ul>
        </fieldset>

        <fieldset className="flex flex-col flex-grow gap-2 px-3 pb-6 border-t rounded-lg">
          <legend className="text-base uppercase font-bold py-1 pl-1 pr-2 text-slate-900">
            GH Fashion School rules &amp; regulation
          </legend>

          <div className="flex flex-col gap-1 text-xs font-normal mt-1 py-2 px-3 border bg-blue-400 text-white border-blue-500 rounded-sm">
            {/* <span className="font-semibold text-white">Kindly Note:</span>{" "} */}
            <span className="font-medium">
              GH Fashion School reserves the right and the prerogative to
              sanction and / or terminate the training of any student who
              breaches these rules and regulation during their stay in the
              school. Other bye laws would be duly communicated to students to
              aid and regulate better teaching and learning environment
            </span>
          </div>

          <ul
            style={{ listStyleType: "circle" }}
            className="flex flex-col gap-4 pl-5"
          >
            {[
              {
                heading: "Discipline and personal hygiene",
                text: "Discipline and personal hygiene is of utmost importance to the academy therefore all student must look very neat and smart always. Indecently dressed students will not be allowed inside the school premises.",
              },
              {
                heading: "Student to model for each other",
                text: "During practical sessions, student are expected to model for each other. If for any reason a student cannot do so, by reason of any medical codition, he or she must notify the school on enrollment with necessary evidence.",
              },
              {
                heading: "Prescribed dress code appearance",
                text: (
                  <>
                    In a bid to inculcate a Professional apperance in students,
                    they are to be in the prescribed uniforms at all times.{" "}
                    <br /> All students must wear the prescribed school uniform:
                    <ul style={{ listStyleType: "square" }} className="pl-4">
                      <li>
                        <b>Uniforms: </b>School Lacoste and school cloth. No
                        mufti and unprescribed uniforms would be allowed.
                      </li>
                      <li>
                        <b>
                          Footwear (BLACK, BROWN, or WHITE loafers/flat shoes):{" "}
                        </b>
                        No talking shoes or high heeled footwears are allowed.
                      </li>
                      <li>
                        <b>Accessories: </b>With the exception of wedding rings
                        and earrings, no other form of accesories or body
                        jewelries are allowed during and around classes' hours.
                      </li>
                    </ul>
                  </>
                ),
              },
              {
                heading: "Class attendance",
                text: "Punctuality and regularity to class must be ensured. The instructor reserves every right to sanction late comers accordingly.",
              },
              {
                heading: "Appearance during practical",
                text: "Students must ensure that during practical hours, they wear overalls or aprons. No student will be permitted to work without it, hence, will not be allowed in class.",
              },
              {
                heading: "School property",
                text: "Students are expected to handle all school properties including tools and equipment with a sense of responsibilty or else damages caused to any school property is payable.",
              },
            ].map((each, ii) => (
              <li key={ii} className="flex-grow w-full">
                <h4 className="text-sm text-slate-900 font-semibold capitalize mb-2">
                  {each?.heading}
                </h4>

                <div className="text-xs font-normal leading-6 text-slate-900">
                  {each?.text}
                </div>
              </li>
            ))}
          </ul>
        </fieldset>
      </div>

      <div className="fixed flex gap-4 justify-center p-4 w-full bg-slate-100 bottom-0 border-t">
        <Button
          text={"Accept & Continue"}
          onClick={closeHandler}
          className="text-center font-bold shadow-lg"
          style={{
            whiteSpace: "nowrap",
            color: "white",
            fontSize: "12px",
            fontWeight: 700,
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: NoticeTheme.success.title.color,
            textTransform: "capitalize",
          }}
        />
      </div>
    </div>
  );
};

export const AttachmentView = ({ data }: { data: GenericObject }) => {
  console.log(data);
  // const [showEndDate, setShowEndDate] = useState(false);
  return (
    <div className="flex flex-col w-full gap-2.5 pb-3 w-[95%] sm:w-[45vw] min-w-[300px] px-3">
      <div className="flex flex-row justify-between items-center w-full">
        <h2 className="text-2xl font-medium w-full">Attachments</h2>
        <Button
          text={"+ Add File"}
          // href={`/admin/dashboard/schedules/create`}
          className="text-center font-bold bg-green-600"
          style={{
            whiteSpace: "nowrap",
            color: "#21B591",
            fontSize: "12px",
            fontWeight: 700,
            padding: "10px",
            borderRadius: "5px",
            textTransform: "capitalize",
          }}
        />
      </div>

      <div className="border"></div>

      <div className="flex flex-row justify-between items-center gap-2 max-w-full overflow-auto py-2">
        <DocumentCard name="file" />
        <DocumentCard name="file" />
        {/* <DocumentCard name="file" />
        <DocumentCard name="file" />
        <DocumentCard name="file" />
        <DocumentCard name="file" /> */}
      </div>

      <div className="border"></div>

      <textarea
        className="text-sm w-full"
        placeholder="Add description"
      ></textarea>
    </div>
  );
};

export const AddComment = ({ data }: { data: GenericObject }) => {
  console.log(data);
  // const [showEndDate, setShowEndDate] = useState(false);
  return (
    <Formik
      initialValues={{
        comment: "",
      }}
      onSubmit={() => {
        try {
          alert('hey')
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {({ handleChange, values, handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-2.5 pb-3 w-[95%] sm:w-[45vw] min-w-[300px] px-3"
        >
          <div className="flex flex-row justify-between items-center w-full">
            <h2 className="text-2xl font-medium w-full">Add Comment</h2>
            <Button
              text={"Send"}
              // href={`/admin/dashboard/schedules/create`}
              className="text-center font-bold bg-green-600"
              style={{
                whiteSpace: "nowrap",
                color: "#21B591",
                fontSize: "12px",
                fontWeight: 700,
                padding: "10px",
                borderRadius: "5px",
                textTransform: "capitalize",
              }}
            />
          </div>

          <div className="border"></div>

          <textarea
            name="comment"
            value={values.comment}
            onChange={handleChange}
            className="text-sm w-full min-h-[150px] bg-slate-100 p-2 rounded-md border-2"
            placeholder="Type your comment"
          ></textarea>
        </form>
      )}
    </Formik>
  );
};
