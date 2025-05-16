import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoaderCircle, MoreVertical } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DeleteResumeById } from "../../../services/GlobalApi";
import { toast } from "sonner";

function ResumeCardItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onDelete = () => {
    setLoading(true);
    // Call the delete function here
    DeleteResumeById(resume.documentId).then(
      (resp) => {
        // Handle success
        toast("Resume deleted successfully");
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => {
        console.log(error);
      }
    );
    // Add your delete logic here
  };
  return (
    <div className="">
      <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
        <div
          className="p-14  bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px] rounded-t-lg border-t-4"
          style={{ borderColor: resume?.themeColor }}
        >
          <div className="flex items-center justify-center h-[180px] ">
            {/* <Notebook/> */}
            <img src="/cv.png" width={80} height={80} />
          </div>
        </div>
      </Link>
      <div
        className="border p-3 flex justify-between  text-white rounded-b-lg shadow-lg"
        style={{
          background: resume?.themeColor,
        }}
      >
        <h2 className="text-sm">{resume.title}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigate(`/dashboard/resume/${resume.documentId}/edit`)
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                resume and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction disabled={loading} onClick={onDelete}>
                {loading ? <LoaderCircle className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;
