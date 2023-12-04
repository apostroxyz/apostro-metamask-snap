export type TransactionInsightResponse = {
  components: InsightContent[];
  severity?: 'critical';
};

export type InsightContent =
  | {
      component_type: 'copyable' | 'heading' | 'image' | 'text';
      content: string;
    }
  | {
      component_type: 'divider';
      content: null;
    };
