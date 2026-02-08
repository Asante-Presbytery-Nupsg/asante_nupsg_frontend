

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AddCBForm = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const reset = () => {
    setName("");
    setContact("");
    setLocation("");
    setDescription("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, call API to create branch. For now, mock success.
    setOpen(false);
    alert(`Created branch: ${name} (mock)`);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">Add Branch</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Coordinating Branch</DialogTitle>
            <DialogDescription>Provide the branch details to create a new coordinating branch.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="cb-name">Branch Name</Label>
              <Input id="cb-name" placeholder="e.g. Legon" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cb-contact">Contact</Label>
                <Input id="cb-contact" placeholder="050..." value={contact} onChange={(e) => setContact(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cb-location">Location</Label>
                <Input id="cb-location" placeholder="e.g. Legon Campus" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cb-desc">Description</Label>
              <Input id="cb-desc" placeholder="Optional description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Create Branch</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCBForm;