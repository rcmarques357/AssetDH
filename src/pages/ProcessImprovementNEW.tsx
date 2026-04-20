import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { InitiativeCard } from '@/components/process-improvement/InitiativeCard';
import { InitiativeDetail } from '@/components/process-improvement/InitiativeDetail';
import { InitiativeForm } from '@/components/process-improvement/InitiativeForm';
import { Task } from '@/components/process-improvement/types';
import { mockInitiatives } from '@/components/process-improvement/mockData';
import { ProcessGET, ProcessPOST, ProcessTask } from '@/components/process-improvement/types';
import { getProcesses } from "@/services/ProcessService";
import { postProcesses } from "@/services/ProcessService";
import { toast } from 'sonner';



export default function ProcessImprovementNEW() {
  const [items, setItems] = useState<ProcessGET[]>([]);
  const [selectedItem, setSelectedItem] = useState<ProcessGET| null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProcessGET | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditInitiative = (item: ProcessGET) => {
      setEditingItem(item);
      setIsFormOpen(true);
    };

  const filteredAndSortedInitiatives = items
    .filter(init => {
      const matchesSearch = init.process_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           init.process_issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           init.process_solution.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || init.process_status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.process_name.localeCompare(b.process_name);
         case 'completion':
           return new Date(b.process_completion_date).getTime()  - new Date(a.process_completion_date).getTime();
        case 'startDate':
          return new Date(b.process_start_date).getTime() - new Date(a.process_start_date).getTime();
        default:
          return 0;
      }
    });

    const handleUpdateItem = (id: string, updates: Partial<ProcessGET>) => {
        setItems(items.map(init => {
          if (init.id === id) {
            const updated = { ...init, ...updates };
            // if (updates.tasks) {
            //   updated.completenessRate = calculateInitiativeCompletion(updates.tasks);
            // }
            return updated;
          }
          return init;
        }));
        if (selectedItem?.id === id) {
          const updated = items.find(i => i.id === id);
          if (updated) {
            setSelectedItem({ ...updated, ...updates });
          }
        }
      };

    const handleCreateItem= async (payload: ProcessPOST) => {
        const controller = new AbortController();
        const { data, error }  = await postProcesses(payload, controller.signal)
        console.log("data: ",data);
        console.log("error: ",error);
        
        if (error !== undefined) {
          console.log("Error Handle: ", error);
          toast.error("Error", { description: `The process creation failed! Error: ${error}` });
          }
        else{
          setItems(items=>[...items, data]);
          toast.success("Saved", { description: 'The process was sucessfuly created!', className: "bg-green-600 text-white border-transparent" });
        }     
        
        //setIsFormOpen(false);
      };

  useEffect(() => {
      const controller = new AbortController();
      (async() => {
        setLoading(true);
        setError(null);
        const { data, error }= await getProcesses(controller.signal);
        if (error)
          setError(error)
        if (data)
          setItems(data);
          //console.log(data)
        setLoading(false);
      }) ();
      return () => controller.abort();
    }, []);

 
    if (loading) return <p>Loading data…</p>;
    if (error) return <p role="alert">{error}</p>;
    //console.log('Filtered: ', filteredAndSortedInitiatives);


  if (selectedItem) {
      return (
        <PageLayout title="Process Improvement">
          <InitiativeDetail
            initiative={selectedItem}
            task= {[]}
            onBack={() => setSelectedItem(null)}
            onUpdate={(updates) => {}} //handleUpdateInitiative(selectedInitiative.id, updates)}
            onDelete={() => {}}//handleDeleteInitiative(selectedInitiative.id)}
            onEdit={() => {}} //handleEditInitiative(selectedInitiative)}
            onUpdateTask={ (taskId, updates) => {}} // handleUpdateTask(selectedInitiative.id, taskId, updates)}
          />
        </PageLayout>
      );
    }

  return (
    <PageLayout title="Process Improvement">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search initiatives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
   
            <Button onClick={() => { setEditingItem(null); setIsFormOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              New Initiative
            </Button>
                
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on hold">On Hold</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="process_name">Name</SelectItem>
              <SelectItem value="completion">Completion Date</SelectItem>
              <SelectItem value="process_start_date">Start Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedInitiatives.map(item => (
            <InitiativeCard
              key={item.id}
              initiative={item}
              onClick={() => setSelectedItem(item)}
              onEdit={() => handleEditInitiative(item)}
              onDelete={() => undefined}
            />
          ))}
        </div>

        {filteredAndSortedInitiatives.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No initiatives found matching your filters.
          </div>
        )}

      </div>

      {isFormOpen && (
              <InitiativeForm
                initiative={editingItem}
                onSave={(data) => {
                  if (editingItem) {
                    handleUpdateItem(editingItem.id, data);
                  } else {
                    handleCreateItem(data);
                  }
                  setIsFormOpen(false);
                  setEditingItem(null);
                }}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingItem(null);
                }}
              />
            )}

    </PageLayout>
  );

}
