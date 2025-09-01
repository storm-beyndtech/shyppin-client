"use client";
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./UI/dialog";
import { Button } from "./UI/button";

interface EditProfileDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	profile: { name: string; location: string };
	onSave: (profile: { name: string; location: string }) => void;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({ open, onOpenChange, profile, onSave }) => {
	const [form, setForm] = useState(profile);

	useEffect(() => {
		setForm(profile);
	}, [profile, open]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(form);
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md w-full rounded-xl p-0" style={{ maxHeight: "90vh", minWidth: 320 }}>
				<DialogHeader className="p-6 pb-2">
					<DialogTitle>Edit Profile</DialogTitle>
					<DialogDescription>Update your profile details below.</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="p-6 pt-2 flex flex-col gap-4">
					<div>
						<label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
							Name
						</label>
						<input
							id="name"
							name="name"
							value={form.name}
							onChange={handleChange}
							className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
							required
						/>
					</div>
					<div>
						<label htmlFor="location" className="block text-sm font-medium text-foreground mb-1">
							Location
						</label>
						<input
							id="location"
							name="location"
							value={form.location}
							onChange={handleChange}
							className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
							required
						/>
					</div>
					<div className="flex justify-end gap-2 pt-2">
						<Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
							Cancel
						</Button>
						<Button type="submit">Save</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default EditProfileDialog;
