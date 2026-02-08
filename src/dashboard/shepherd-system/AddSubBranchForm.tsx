import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface AddSubBranchFormProps {
  parentBranchId: string;
  parentBranchName: string;
}

const AddSubBranchForm = ({ parentBranchId, parentBranchName }: AddSubBranchFormProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");

  const reset = () => {
    setName("");
    setLocation("");
    setContact("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, call API to create sub-branch
    setOpen(false);
    alert(`Created sub-branch: ${name} under ${parentBranchName} (mock)`);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
          <Plus className="mr-2 h-4 w-4" /> Add Sub-Branch
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Sub-Branch</DialogTitle>
            <DialogDescription>Create a new sub-branch under {parentBranchName}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="sub-name">Sub-Branch Name</Label>
              <Input 
                id="sub-name" 
                placeholder="e.g. Legon North" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sub-location">Location</Label>
                <Input 
                  id="sub-location" 
                  placeholder="e.g. North Campus" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sub-contact">Contact</Label>
                <Input 
                  id="sub-contact" 
                  placeholder="050..." 
                  value={contact} 
                  onChange={(e) => setContact(e.target.value)} 
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Create Sub-Branch</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubBranchForm;
